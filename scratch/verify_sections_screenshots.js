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
    await sleep(4000);

    // Scroll to hello section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: window.innerHeight * 2.8, behavior: 'instant' })`
    });
    await sleep(1500);
    let snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('e:/nesilnoble.com/scratch/snap_hello.png', Buffer.from(snap.result.data, 'base64'));

    // Scroll to beliefs section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: window.innerHeight * 6.5, behavior: 'instant' })`
    });
    await sleep(1500);
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('e:/nesilnoble.com/scratch/snap_beliefs.png', Buffer.from(snap.result.data, 'base64'));

    // Scroll to about section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`
    });
    await sleep(1500);
    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('e:/nesilnoble.com/scratch/snap_about.png', Buffer.from(snap.result.data, 'base64'));

    console.log('Saved all screenshots!');
    ws.close();
  } finally {
    try {
      chromeProcess.kill('SIGKILL');
    } catch {}
  }
}

main().catch(console.error);
