const http = require('http');
const fs = require('fs');
const { execFile } = require('child_process');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startChrome() {
  const chromeProcess = execFile(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    '--user-data-dir=C:\\Users\\rikik\\AppData\\Local\\Temp\\chrome-test-profile-' + Date.now()
  ]);

  for (let i = 0; i < 30; i++) {
    await sleep(200);
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) return chromeProcess;
    } catch {}
  }
  throw new Error('Chrome did not start');
}

async function main() {
  const chromeProcess = await startChrome();
  const WS = globalThis.WebSocket;

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const list = await listRes.json();
    const target = list.find(t => t.type === 'page') || list[0];
    const ws = new WS(target.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    await new Promise(r => {
      if (ws.readyState === 1) return r();
      ws.onopen = () => r();
    });

    function send(method, params = {}) {
      return new Promise(resolve => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3500);

    // 1. Check Hello Section text
    const hiEval = await send('Runtime.evaluate', {
      expression: `({
        hiText: document.getElementById('hiLine')?.textContent,
        hiWidth: document.getElementById('hiLine')?.offsetWidth,
        windowWidth: window.innerWidth,
        hiCap: document.getElementById('hiCap')?.textContent.trim()
      })`,
      returnByValue: true
    });
    console.log('HELLO SECTION:', hiEval.result.value);

    // 2. Check Beliefs Section
    const blEval = await send('Runtime.evaluate', {
      expression: `document.querySelector('.bl-years')?.textContent`,
      returnByValue: true
    });
    console.log('BELIEFS SECTION (YEARS):', blEval.result.value);

    // 3. Check About Section
    const abEval = await send('Runtime.evaluate', {
      expression: `({
        facts: [...document.querySelectorAll('#facts div')].map(d => ({
          dt: d.querySelector('dt')?.textContent,
          dd: d.querySelector('dd')?.textContent
        })),
        moreLinks: [...document.querySelectorAll('#more a')].map(a => a.textContent)
      })`,
      returnByValue: true
    });
    console.log('ABOUT SECTION:', JSON.stringify(abEval.result.value, null, 2));

    // 4. Open The Local Project case study and check images inside iframe
    await send('Runtime.evaluate', {
      expression: `
        const link = document.querySelector('a[data-case="the-local-project"]');
        if (link) link.click();
      `
    });

    await sleep(2500);

    const csEval = await send('Runtime.evaluate', {
      expression: `({
        isOpen: document.getElementById('cs')?.classList.contains('open'),
        isReady: document.getElementById('cs')?.classList.contains('ready'),
        iframeSrc: document.getElementById('csFrame')?.src,
        iframeImagesCount: document.getElementById('csFrame')?.contentDocument?.images.length || 0,
        brokenImages: [...(document.getElementById('csFrame')?.contentDocument?.images || [])]
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src)
      })`,
      returnByValue: true
    });
    console.log('THE LOCAL PROJECT CASE STUDY:', csEval.result.value);

    // Take screenshot of case study modal
    const snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('e:/nesilnoble.com/scratch/snap_local_project.png', Buffer.from(snap.result.data, 'base64'));
    console.log('Saved screenshot: scratch/snap_local_project.png');

    ws.close();
  } finally {
    try {
      chromeProcess.kill('SIGKILL');
    } catch {}
  }
}

main().catch(console.error);
