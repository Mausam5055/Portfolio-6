"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function usePortfolioExperience() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = typeof window !== "undefined" && window.location.search.includes("reduced=1");
    if (reduce) {
      document.documentElement.classList.add("rm");
      return;
    }

    const $ = (s: string) => document.querySelector(s) as HTMLElement | null;
    const stage = $("#stage");
    if (!stage) return;

    const C = {
      deep: "#2A2650",
      turmeric: "#545388",
      hibiscus: "#7B3F6E",
      monsoon: "#3E5591",
      backwater: "#2B6468",
      leaf: "#4C6230",
      kokum: "#8A3D4E",
    };

    // 1. Smooth Scroll Setup with Lenis
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. Amplitude typography woodblock randomizer
    function rng(seed: number) {
      return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    }
    function amp(el: Element) {
      const htmlEl = el as HTMLElement;
      const r = rng(+(htmlEl.dataset.amp || 1));
      el.setAttribute("aria-label", el.textContent?.replace(/\s+/g, " ").trim() || "");
      const walk = (node: Node) => {
        [...node.childNodes].forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            let prevSmall = true;
            n.textContent?.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(" "));
                return;
              }
              const w = document.createElement("span");
              w.style.cssText = "display:inline-block;white-space:nowrap";
              w.setAttribute("aria-hidden", "true");
              [...part].forEach((c) => {
                const x = document.createElement("span");
                x.textContent = c;
                const v = r();
                if (/[a-z]/i.test(c) && !prevSmall && v < 0.3) {
                  x.className = "s";
                  prevSmall = true;
                } else {
                  prevSmall = false;
                  if (/[a-z]/i.test(c) && v > 0.88) x.className = "u";
                }
                w.appendChild(x);
              });
              frag.appendChild(w);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1 && (n as Element).tagName.toLowerCase() !== "svg") {
            walk(n);
          }
        });
      };
      walk(el);
      el.classList.add("amp");
    }
    document.querySelectorAll("[data-amp]").forEach(amp);

    // Split #hiLine into letters
    const hi = $("#hiLine");
    let chars: NodeListOf<Element> | null = null;
    if (hi && hi.textContent) {
      hi.setAttribute("aria-label", hi.textContent);
      const hr = rng(21);
      let hp = true;
      hi.innerHTML = hi.textContent
        .split(" ")
        .map(
          (w) =>
            '<span class="wd" aria-hidden="true">' +
            [...w]
              .map((c) => {
                const small = /[a-z]/i.test(c) && !hp && hr() < 0.34;
                hp = small;
                return '<span class="ch' + (small ? " sm" : "") + '">' + c + "</span>";
              })
              .join("") +
            "</span>",
        )
        .join(" ");
      hi.classList.add("amp");
      chars = hi.querySelectorAll(".ch");
    }

    // Concentric tunnel rings inside #tunnel
    const tunnel = $("#tunnel");
    function buildTunnel() {
      if (!tunnel || !stage) return;
      tunnel.innerHTML = "";
      const w = stage.clientWidth,
        h = stage.clientHeight;
      const D = Math.hypot(w, h);
      for (let i = 0; i < 11; i++) {
        const d = document.createElement("div");
        const size = D * Math.pow(0.8, i);
        d.style.width = d.style.height = size + "px";
        d.style.left = (w - size) / 2 + "px";
        d.style.top = (h - size) / 2 + "px";
        d.style.borderRadius = "50%";
        tunnel.appendChild(d);
      }
    }
    buildTunnel();

    // Measure name bounds
    const nameWrap = $("#nameWrap"),
      cursor = $("#cursor"),
      sel = $("#sel"),
      dim = $("#dim"),
      heroIn = $("#heroInner");

    function measure() {
      const name = $("#name");
      if (!name || !dim) return;
      const r = name.getBoundingClientRect();
      const s = Number(gsap.getProperty("#heroInner", "scale")) || 1;
      dim.textContent = Math.round(r.width / s) + " × " + Math.round(r.height / s);
    }

    const B = () => {
      if (!heroIn || !nameWrap) return { x: 0, y: 0 };
      const a = heroIn.getBoundingClientRect(),
        n = nameWrap.getBoundingClientRect();
      return { x: n.left - a.left, y: n.top - a.top };
    };

    if (cursor && nameWrap) {
      gsap.set(cursor, {
        x: () => B().x + nameWrap.offsetWidth + 120,
        y: () => B().y + nameWrap.offsetHeight + 160,
        opacity: 0,
      });
    }

    let idleTween: gsap.core.Tween | null = null;
    function idle() {
      if (!cursor || !nameWrap) return;
      idleTween = gsap.to(cursor, {
        x: () => B().x + nameWrap.offsetWidth * gsap.utils.random(0.6, 0.97),
        y: () => B().y + nameWrap.offsetHeight * gsap.utils.random(0.2, 0.9),
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });
    }

    // Intro animation: Name condenses and selection marquee box drags
    const intro = gsap.timeline({ delay: 0.25 });
    intro
      .fromTo(
        "#name",
        { letterSpacing: "0.32em", opacity: 0 },
        { letterSpacing: "-0.01em", opacity: 1, duration: 1.5, ease: "expo.out" },
      )
      .from(".kicker", { y: 14, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.5)
      .from("#phrase span", { y: 16, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 1.0)
      .to(
        cursor,
        {
          opacity: 1,
          x: () => B().x - 18,
          y: () => B().y - 3,
          duration: 0.8,
          ease: "power3.inOut",
        },
        1.05,
      )
      .add(() => measure(), 1.8)
      .to(
        cursor,
        {
          x: () => (nameWrap ? B().x + nameWrap.offsetWidth + 18 : 0),
          y: () => (nameWrap ? B().y + nameWrap.offsetHeight + 14 : 0),
          duration: 0.9,
          ease: "power2.inOut",
        },
        1.85,
      )
      .set(sel, { opacity: 1 }, 1.85)
      .to(
        sel,
        {
          width: () => (nameWrap ? nameWrap.offsetWidth + 36 : 0),
          height: () => (nameWrap ? nameWrap.offsetHeight + 17 : 0),
          duration: 0.9,
          ease: "power2.inOut",
        },
        1.85,
      )
      .to(
        dim,
        {
          opacity: 1,
          duration: 0.4,
          onUpdate() {
            measure();
          },
        },
        2.25,
      )
      .add(idle, 2.9)
      .add(life, 2.2)
      .add(eyes, 2.9);

    // Life animation: Waving hand, bobbing thought bubbles, birds
    function life() {
      gsap.to("#birds .bird", {
        scaleY: 0.45,
        transformOrigin: "50% 60%",
        duration: 0.32,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.11, from: "random" },
      });
      gsap.to("#birds", {
        x: 18,
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("#hand", {
        rotation: 14,
        svgOrigin: "112 338",
        duration: 0.45,
        ease: "sine.inOut",
        repeat: 5,
        yoyo: true,
        repeatDelay: 0.05,
        onComplete() {
          gsap.to("#hand", {
            rotation: 10,
            svgOrigin: "112 338",
            duration: 1.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
      gsap.utils.toArray("#thoughts .th").forEach((t, i) => {
        gsap.to(t as HTMLElement, {
          y: gsap.utils.random(-12, -5),
          rotation: gsap.utils.random(-12, 12),
          duration: gsap.utils.random(1.6, 2.4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.12,
        });
      });
    }

    // Eye tracking following cursor
    function eyes() {
      const whites = gsap.utils.toArray("#me .eye") as HTMLElement[];
      const pupils = gsap.utils.toArray("#me .pupil") as HTMLElement[];
      const REST = { x: 6, y: -10 },
        MX = 9,
        MY = 13;
      const movers = pupils.map((p) => ({
        x: gsap.quickTo(p, "x", { duration: 0.45, ease: "power3.out" }),
        y: gsap.quickTo(p, "y", { duration: 0.45, ease: "power3.out" }),
      }));
      let px = 0,
        py = 0,
        queued = false;

      function look() {
        queued = false;
        whites.forEach((w, i) => {
          const r = w.getBoundingClientRect();
          const dx = px - (r.left + r.width / 2);
          const dy = py - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, d / 220);
          movers[i].x((dx / d) * MX * k - REST.x);
          movers[i].y((dy / d) * MY * k - REST.y);
        });
      }

      window.addEventListener(
        "pointermove",
        (e) => {
          px = e.clientX;
          py = e.clientY;
          if (!queued) {
            queued = true;
            requestAnimationFrame(look);
          }
        },
        { passive: true },
      );
      document.documentElement.addEventListener("pointerleave", () =>
        movers.forEach((m) => {
          m.x(0);
          m.y(0);
        }),
      );
    }

    // Phone adaptation
    const dream = $("#dream"),
      phrase = $("#phrase"),
      heroTop = $(".hero-top"),
      me = $("#me"),
      birds = $("#birds");
    let tightPhone = false;

    function fitPhone() {
      if (!me || !dream || !birds) return;
      me.style.width =
        dream.style.top =
        dream.style.left =
        dream.style.fontSize =
        birds.style.left =
        birds.style.top =
          "";
      tightPhone = false;
      if (!window.matchMedia("(max-width: 720px)").matches) return;
      if (!stage || !heroTop || !phrase) return;
      const SW = stage.clientWidth;
      const SH = stage.clientHeight;
      const below = heroTop.offsetTop + phrase.offsetTop + phrase.offsetHeight;
      let w = me.offsetWidth;
      const room = (SH - below - 10) / ((0.9375 * 570) / 600);
      if (w > room) {
        w = Math.max(room, SW * 0.72);
        me.style.width = w + "px";
        dream.style.fontSize = "13px";
        dream.style.left = SW * 0.03 - (SW - w) / 2 + "px";
      }
      const meTop = SH - w * 0.9375;
      const thoughtsTop = SH - (w * 0.9375 * 570) / 600;
      if (dream.offsetTop < below + 18 - meTop) dream.style.top = below + 18 - meTop + "px";

      if (heroIn) {
        const hr = heroIn.getBoundingClientRect();
        const br = birds.getBoundingClientRect();
        const k = hr.width / heroIn.offsetWidth || 1;
        const bTop = (br.top - hr.top) / k - (Number(gsap.getProperty(birds, "y")) || 0);
        const bH = br.height / k;
        if (bTop < below + 6 || bTop + bH > thoughtsTop - 6) {
          tightPhone = true;
          birds.style.left = "5%";
          birds.style.top = below + 14 + "px";
        }
      }
    }
    fitPhone();

    let origin = "50% 60%";
    function findOrigin() {
      const inner = $("#heroInner");
      const meEl = $("#me");
      if (!inner || !meEl) return;
      const s = Number(gsap.getProperty(inner, "scale")) || 1;
      if (s !== 1) return;
      const a = inner.getBoundingClientRect();
      const m = meEl.getBoundingClientRect();
      origin = m.left - a.left + m.width * 0.5 + "px " + (m.top - a.top + m.height * (228 / 600)) + "px";
    }
    findOrigin();

    // 3. Master Journey Timeline (Scrubbed with ScrollTrigger)
    const W = () => window.innerWidth;
    let handed = false;
    function ending(p: number) {
      if (p > 0.965 && !handed) {
        handed = true;
        if (idleTween) idleTween.pause();
        const label = $("#cursorLabel");
        if (label) label.textContent = "Your turn";
        const m = $("#mail")?.getBoundingClientRect();
        const n = heroIn?.getBoundingClientRect();
        if (m && n && cursor) {
          gsap.to(cursor, {
            x: m.left - n.left + m.width * 0.8,
            y: m.top - n.top + m.height * 0.55,
            duration: 0.8,
            ease: "power3.inOut",
          });
        }
      } else if (p < 0.94 && handed) {
        handed = false;
        const label = $("#cursorLabel");
        if (label) label.textContent = "Mausam";
        if (idleTween) idleTween.restart();
        else idle();
      }
    }

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#space",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set("#head", { left: self.progress * 100 + "%" });
          ending(self.progress);
        },
      },
    });

    // Dive into open mind
    tl.addLabel("hero", 0)
      .to("#hint", { autoAlpha: 0, duration: 0.2 }, 0)
      .to(".hero-top", { autoAlpha: 0, y: -40, duration: 0.35 }, 0)
      .to(
        "#heroInner",
        {
          scale: 22,
          transformOrigin: () => origin,
          duration: 1.1,
          ease: "power3.in",
        },
        0,
      )
      .to("#heroInner", { autoAlpha: 0, duration: 0.25 }, 0.85)
      .fromTo(
        tunnel,
        { scaleX: 0.3, scaleY: 0.08, autoAlpha: 0 },
        { scaleX: 1.4, scaleY: 1.4, autoAlpha: 1, duration: 0.6, ease: "power1.in" },
        0.6,
      )
      .to(tunnel, { scale: 9, duration: 0.7, ease: "power2.in" }, 1.1)
      .to(tunnel, { autoAlpha: 0, duration: 0.25 }, 1.6)
      .to(stage, { "--bg": C.hibiscus, duration: 1.2 }, 0.5)

      // Hello scene
      .set("#hello", { autoAlpha: 1 }, 1.75);

    if (chars && chars.length) {
      tl.fromTo(
        chars,
        { yPercent: 150, rotate: () => gsap.utils.random(-45, 45), autoAlpha: 0 },
        {
          yPercent: 0,
          rotate: (i: number) => [-4, 3, -2, 5, -3, 2, -5, 3, 4, -2, 3, -4, 2, -3][i % 14],
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "back.out(1.7)",
        },
        1.8,
      );
    }

    tl.fromTo(
      "#hello .spark",
      { scale: 0, rotation: -120, transformOrigin: "50% 50%" },
      { scale: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2.4)" },
      2.1,
    )
      .fromTo("#squigPath", { strokeDasharray: 420, strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.6 }, 2.5)
      .addLabel("hello", 2.9)
      .to("#hello .doodles", { scale: 1.6, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 3.6)
      .fromTo("#hiCap", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 2.6)
      .to("#hiCap", { autoAlpha: 0, duration: 0.3 }, 3.6)
      .to("#hiLine", { scale: 8, autoAlpha: 0, transformOrigin: "46% 55%", duration: 1.0, ease: "power2.in" }, 3.6)
      .to(stage, { "--bg": C.monsoon, duration: 1.0 }, 3.9)
      .set("#hello", { autoAlpha: 0 }, 4.65)

      // Systems scene
      .set("#systems", { autoAlpha: 1 }, 4.55)
      .fromTo("#sysWord", { scale: 0.16, "--wg": 100, rotate: 0 }, { scale: 1, "--wg": 900, rotate: -5, duration: 1.3, ease: "power3.out" }, 4.6)
      .fromTo("#sysSmall", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 5.0);

    const sws = gsap.utils.toArray("#kit .sw") as HTMLElement[];
    sws.forEach((s, i) => {
      const a = (i / sws.length) * Math.PI * 2 + 0.6;
      tl.fromTo(
        s,
        {
          x: () => Math.cos(a) * W() * 0.45,
          y: () => Math.sin(a) * window.innerHeight * 0.45,
          scale: 0.4,
          autoAlpha: 0,
        },
        {
          x: () => -150 + i * 34,
          y: () => -4,
          scale: 0.62,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        5.2 + i * 0.05,
      );
    });

    tl.fromTo("#card", { scale: 0.6, autoAlpha: 0, rotate: 4 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.5, ease: "back.out(1.4)" }, 6.0)
      .to("#sysWord", { autoAlpha: 0.22, duration: 0.5 }, 6.0)
      .fromTo("#sysCap", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 6.3)
      .addLabel("systems", 6.6)
      .to(["#kit", "#sysSmall", "#sysCap"], { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 7.3)
      .to("#sysWord", { scale: 2.2, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 7.3)
      .to(stage, { "--bg": C.deep, duration: 0.9 }, 7.4)
      .set("#systems", { autoAlpha: 0 }, 7.92)

      // Based in Bengaluru
      .set("#based", { autoAlpha: 1 }, 7.95)
      .fromTo("#basedText > span", { xPercent: 70, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 8.0)
      .fromTo("#auto", { x: () => -W() * 0.35 }, { x: () => W() * 1.1, duration: 2.0 }, 8.3)
      .fromTo("#wf", { rotation: 0 }, { rotation: -1080, svgOrigin: "72 206", duration: 2.0 }, 8.3)
      .fromTo("#wr", { rotation: 0 }, { rotation: -1080, svgOrigin: "272 206", duration: 2.0 }, 8.3)
      .fromTo("#basedCap", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 8.9)
      .fromTo("#based .palm", { x: () => W() * 0.12 }, { x: () => -W() * 0.12, duration: 2.8 }, 8.0)
      .fromTo("#based .hills", { x: () => W() * 0.03, autoAlpha: 0 }, { x: () => -W() * 0.03, autoAlpha: 1, duration: 2.8 }, 8.0)
      .fromTo("#based .palm", { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.6)" }, 8.1)
      .fromTo("#cup", { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(1.8)" }, 8.6)
      .fromTo("#steam", { y: 8, opacity: 0.2 }, { y: -10, opacity: 1, duration: 1.4 }, 8.8)
      .addLabel("based", 9.3)
      .to("#based .doodles", { yPercent: 30, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 10.3)
      .to("#basedText > span", { xPercent: -70, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power2.in" }, 10.2)
      .to("#basedCap", { autoAlpha: 0, duration: 0.3 }, 10.2)
      .to(stage, { "--bg": C.leaf, duration: 0.8 }, 10.3)
      .set("#based", { autoAlpha: 0 }, 10.95)

      // Work section horizontal track
      .set("#work", { autoAlpha: 1 }, 10.85)
      .fromTo(".work-head", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 10.9)
      .fromTo(".proj", { y: 80, rotate: 2, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 11.0)
      .fromTo("#peek", { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "back.out(2)" }, 11.2)
      .fromTo(["#pl", "#pr"], { x: 0 }, { x: 4, duration: 0.3 }, 11.6)
      .addLabel("work", 11.5)
      .to(
        "#track",
        {
          x: () => {
            const track = document.querySelector("#track") as HTMLElement | null;
            return track ? -(track.scrollWidth - (stage?.clientWidth || window.innerWidth)) : 0;
          },
          duration: 3.6,
          ease: "power1.inOut",
        },
        11.7,
      )
      .to("#work", { yPercent: -18, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 15.4)
      .to(stage, { "--bg": C.kokum, duration: 0.8 }, 15.5)

      // About section
      .set("#about", { autoAlpha: 1 }, 15.85)
      .fromTo("#aboutSt i", { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.14, ease: "power3.out" }, 15.9)
      .fromTo(["#aboutSub", "#facts", "#tools", "#more"], { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, 16.4)
      .fromTo("#trail", { strokeDashoffset: 320, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.8 }, 16.2)
      .fromTo("#planeBody", { x: -190, y: 60, rotation: -20, svgOrigin: "226 36" }, { x: 0, y: 0, rotation: 0, svgOrigin: "226 36", duration: 0.8, ease: "power2.out" }, 16.2)
      .addLabel("about", 16.9)
      .to("#about", { scale: 0.92, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 17.4)

      // Contact & Outro
      .set("#role", { autoAlpha: 0 }, 17.9)
      .set("#contact", { autoAlpha: 1 }, 17.9)
      .fromTo("#dream", { autoAlpha: 0, scale: 0.6, rotation: -20 }, { autoAlpha: 1, scale: 1, rotation: -7, duration: 0.45, ease: "back.out(2)", immediateRender: false }, 19.45)
      .fromTo("#birds", { opacity: 1 }, { opacity: () => (tightPhone ? 0 : 1), duration: 0.3, immediateRender: false }, 19.4)
      .to(stage, { "--bg": C.turmeric, duration: 0.9 }, 17.9)
      .fromTo(tunnel, { scale: 9, autoAlpha: 0 }, { scale: 1.2, autoAlpha: 1, duration: 0.9, ease: "power2.out", immediateRender: false }, 17.9)
      .to(tunnel, { scale: 0.42, autoAlpha: 0, duration: 0.5 }, 18.8)
      .fromTo("#heroInner", { scale: 22 }, { scale: 1, transformOrigin: () => origin, duration: 1.0, ease: "power3.out", immediateRender: false }, 18.4)
      .fromTo("#heroInner", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32, ease: "power1.inOut", immediateRender: false }, 18.9)
      .fromTo(".hero-top", { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, duration: 0.4, immediateRender: false }, 19.1)
      .addLabel("contact", 20)
      .to({}, { duration: 0.01 }, 20);

    // Beliefs chapters
    const S = 7.95,
      M = 9.3;
    tl.shiftChildren(M, true, 7.94);

    document.querySelectorAll(".bl-b h3").forEach((h) => {
      h.setAttribute("aria-label", h.textContent || "");
      h.innerHTML = (h.textContent || "")
        .split(" ")
        .map((w) => '<span class="w" aria-hidden="true">' + w + "</span>")
        .join("\u200B");
    });

    tl.set("#beliefs", { autoAlpha: 1 }, S)
      .set("#blA", { autoAlpha: 1 }, S)
      .fromTo(".bl-years", { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, S)
      .fromTo("#blUnder", { strokeDasharray: 440, strokeDashoffset: 440 }, { strokeDashoffset: 0, duration: 0.45 }, S + 0.35)
      .fromTo(".bl-hands", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, S + 0.3)
      .to("#blA", { y: -50, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, S + 1.0);

    ["#blB1", "#blB2", "#blB3", "#blB4"].forEach((id, k) => {
      const t = S + 1.3 + k * 1.0;
      tl.set(id, { autoAlpha: 1 }, t)
        .fromTo(id + " h3 .w", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.018, ease: "power3.out" }, t)
        .fromTo(id + " p:not(.bl-kick)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, t + 0.2);

      if (id === "#blB4") {
        tl.fromTo("#blB4 .bl-kick", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, t + 0.4);
      }
      tl.to(id, { y: -40, autoAlpha: 0, duration: 0.25, ease: "power2.in" }, t + 0.78);
    });

    tl.addLabel("beliefs", S + 1.5);
    const c = S + 5.4;
    tl.set("#blC", { autoAlpha: 1 }, c)
      .fromTo(".bl-c .c1", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, c)
      .fromTo(".bl-c .c2", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, c + 0.35)
      .fromTo("#strikePath", { strokeDasharray: 340, strokeDashoffset: 340 }, { strokeDashoffset: 0, duration: 0.3 }, c + 0.8)
      .fromTo(".bl-c .c3", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, c + 1.0)
      .to("#blC", { y: -40, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, c + 1.85);

    const d = S + 7.6;
    tl.set("#blD", { autoAlpha: 1 }, d)
      .fromTo(".bl-d h2", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, d)
      .fromTo(".bl-d p:not(.bl-open)", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, d + 0.25)
      .fromTo(".bl-open", { y: 20, opacity: 0 }, { y: 0, opacity: 0.85, duration: 0.35 }, d + 0.4)
      .fromTo(
        "#blD .ddp",
        { scale: 0, rotation: () => gsap.utils.random(-30, 30) },
        { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.2)", stagger: { each: 0.05, from: "random" } },
        d + 0.1,
      )
      .to("#blD", { y: -40, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, d + 1.3)
      .to(stage, { "--bg": C.backwater, duration: 0.6 }, S + M - 0.6)
      .set("#beliefs", { autoAlpha: 0 }, S + M - 0.05);

    // Opening mind
    const OPEN = 1.0;
    tl.shiftChildren(OPEN, true, 0);
    tl.to(["#hint", "#hintM"], { autoAlpha: 0, duration: 0.3 }, 0)
      .fromTo("#lid", { rotation: -7, svgOrigin: "206 232" }, { rotation: -78, svgOrigin: "206 232", duration: 0.8, ease: "power2.inOut", immediateRender: false }, 0.05)
      .fromTo("#cavity", { attr: { ry: 13 } }, { attr: { ry: 20 }, duration: 0.6, immediateRender: false }, 0.1)
      .fromTo("#rings", { opacity: 0, scale: 0.3, svgOrigin: "320 232" }, { opacity: 1, scale: 1.15, svgOrigin: "320 232", scaleY: 1.3, duration: 0.7, ease: "power2.out" }, 0.2)
      .fromTo("#thoughts .th", { scale: 0, opacity: 0, yPercent: 160 }, { scale: 1, opacity: 1, yPercent: 0, transformOrigin: "50% 50%", duration: 0.55, stagger: 0.06, ease: "back.out(1.8)" }, 0.3)
      .to(".hero-top", { y: -12, duration: OPEN }, 0);

    tl.fromTo("#lid", { rotation: -78, svgOrigin: "206 232" }, { rotation: -10, svgOrigin: "206 232", duration: 0.6, ease: "back.out(2)", immediateRender: false }, tl.labels.contact - 0.7)
      .to("#rings", { opacity: 0, duration: 0.3 }, tl.labels.contact - 0.7)
      .to("#thoughts .th", { scale: 0.85, duration: 0.4 }, tl.labels.contact - 0.7);

    // Doodles drift with pointer
    const drift = (gsap.utils.toArray("#blD .dd") as HTMLElement[]).map((el) => {
      const t = el.querySelector(".ddp");
      const dVal = +(el.dataset.depth || 10);
      return {
        d: dVal,
        x: t ? gsap.quickTo(t, "x", { duration: 0.9, ease: "power3.out" }) : () => {},
        y: t ? gsap.quickTo(t, "y", { duration: 0.9, ease: "power3.out" }) : () => {},
      };
    });

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      drift.forEach((m) => {
        m.x(dx * m.d * 2);
        m.y(dy * m.d * 2);
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Ruler buttons and navigation
    const ruler = $("#ruler");
    const total = tl.duration();
    const marks = [
      ["hello", "Hello"],
      ["systems", "Systems"],
      ["beliefs", "Beliefs"],
      ["based", "Assam"],
      ["work", "Work"],
      ["about", "About"],
      ["contact", "Contact"],
    ];
    if (ruler) {
      ruler.querySelectorAll("button").forEach((b) => b.remove());
      marks.forEach(([k, t]) => {
        const b = document.createElement("button");
        b.textContent = t;
        b.dataset.go = k;
        b.tabIndex = -1;
        b.style.left = Math.min(98, (tl.labels[k] / total) * 100) + "%";
        b.addEventListener("click", () => go(k));
        ruler.appendChild(b);
      });
    }

    function go(k: string) {
      const st = tl.scrollTrigger;
      if (!st) return;
      const y = st.start + (tl.labels[k] / total) * (st.end - st.start);
      lenis.scrollTo(y, { duration: 1.6 });
    }

    const handleResize = () => {
      fitPhone();
      buildTunnel();
      measure();
      findOrigin();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  const scrollTo = (key: string) => {
    const st = ScrollTrigger.getAll()[0];
    if (!st || !lenisRef.current) return;
    const tl = st.animation as gsap.core.Timeline | undefined;
    if (!tl || !tl.labels) return;
    const total = tl.duration();
    if (tl.labels[key] !== undefined) {
      const y = st.start + (tl.labels[key] / total) * (st.end - st.start);
      lenisRef.current.scrollTo(y, { duration: 1.6 });
    }
  };

  return { scrollTo };
}
