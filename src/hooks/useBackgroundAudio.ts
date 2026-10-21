"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SRC = "/audio/interactive-playground.mp3";
const VOL = 0.45;

export function useBackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInvite, setIsInvite] = useState(true);
  const [isNudge, setIsNudge] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufSrcRef = useRef<AudioBufferSourceNode | null>(null);
  const modeRef = useRef<"stream" | "webaudio">("stream");
  const playingRef = useRef(false);
  const wantedRef = useRef(true);
  const startedRef = useRef(false);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ramp = useCallback((to: number, ms: number, done?: () => void) => {
    if (fadeRef.current) clearInterval(fadeRef.current);

    if (modeRef.current === "webaudio" && ctxRef.current && gainRef.current) {
      const t = ctxRef.current.currentTime;
      gainRef.current.gain.cancelScheduledValues(t);
      gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, t);
      gainRef.current.gain.linearRampToValueAtTime(to, t + ms / 1000);
      if (done) setTimeout(done, ms);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    const from = audio.volume;
    const t0 = performance.now();
    fadeRef.current = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      try {
        audio.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      } catch (_) {}
      if (k === 1) {
        if (fadeRef.current) clearInterval(fadeRef.current);
        done?.();
      }
    }, 30);
  }, []);

  const toWebAudio = useCallback(async () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (modeRef.current === "webaudio" || !AC) return;
    modeRef.current = "webaudio";
    audioRef.current?.pause();

    try {
      if (!ctxRef.current) ctxRef.current = new AC();
      if (ctxRef.current.state === "suspended") await ctxRef.current.resume();

      const res = await fetch(SRC);
      const arrayBuffer = await res.arrayBuffer();
      const buf = await ctxRef.current.decodeAudioData(arrayBuffer);

      const gain = ctxRef.current.createGain();
      gain.gain.value = 0;
      gain.connect(ctxRef.current.destination);
      gainRef.current = gain;

      const bufSrc = ctxRef.current.createBufferSource();
      bufSrc.buffer = buf;
      bufSrc.loop = true;
      bufSrc.connect(gain);
      bufSrc.start(0);
      bufSrcRef.current = bufSrc;

      if (playingRef.current) {
        ramp(VOL, 1400);
      } else {
        ctxRef.current.suspend();
      }
    } catch (_) {
      playingRef.current = false;
      startedRef.current = false;
      setIsPlaying(false);
    }
  }, [ramp]);

  const watchStream = useCallback(() => {
    if (checkRef.current) clearTimeout(checkRef.current);
    const audio = audioRef.current;
    if (!audio) return;
    const t0 = audio.currentTime;
    checkRef.current = setTimeout(() => {
      if (
        playingRef.current &&
        modeRef.current === "stream" &&
        (audio.paused || audio.currentTime <= t0 + 0.05)
      ) {
        toWebAudio();
      }
    }, 2200);
  }, [toWebAudio]);

  const unlock = useCallback(() => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    try {
      if (!ctxRef.current) ctxRef.current = new AC();
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    } catch (_) {}
  }, []);

  const play = useCallback(() => {
    unlock();
    playingRef.current = true;
    startedRef.current = true;
    setIsPlaying(true);
    setIsInvite(false);
    setIsNudge(false);

    if (modeRef.current === "webaudio" && ctxRef.current) {
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
      ramp(VOL, 1400);
      return;
    }

    const audio = audioRef.current;
    if (audio) {
      const p = audio.play();
      ramp(VOL, 1400);
      watchStream();
      if (p && p.catch) {
        p.catch(() => {
          if (playingRef.current) toWebAudio();
        });
      }
    }
  }, [ramp, toWebAudio, unlock, watchStream]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setIsPlaying(false);
    if (checkRef.current) clearTimeout(checkRef.current);

    ramp(0, 500, () => {
      if (playingRef.current) return;
      if (modeRef.current === "webaudio" && ctxRef.current) {
        ctxRef.current.suspend();
      } else {
        audioRef.current?.pause();
      }
    });
  }, [ramp]);

  const toggle = useCallback(() => {
    if (playingRef.current) {
      wantedRef.current = false;
      stop();
    } else {
      wantedRef.current = true;
      play();
    }
  }, [play, stop]);

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const nudgeTimer = setTimeout(() => {
      if (!startedRef.current && wantedRef.current) {
        setIsNudge(true);
      }
    }, 2600);

    const gestures = ["pointerdown", "pointerup", "click", "keydown", "touchend"];
    const handleFirstGesture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest && target.closest("#sound")) return;
      if (wantedRef.current && !startedRef.current) {
        play();
      }
      if (startedRef.current) {
        gestures.forEach((g) => window.removeEventListener(g, handleFirstGesture, true));
      }
    };

    gestures.forEach((g) => window.addEventListener(g, handleFirstGesture, true));

    // Try auto-play
    const auto = audio.play();
    if (auto && auto.then) {
      auto
        .then(() => {
          if (startedRef.current) return;
          playingRef.current = true;
          startedRef.current = true;
          setIsPlaying(true);
          setIsInvite(false);
          setIsNudge(false);
          ramp(VOL, 1400);
          gestures.forEach((g) => window.removeEventListener(g, handleFirstGesture, true));
        })
        .catch(() => {});
    }

    const handleVisibility = () => {
      if (document.hidden) {
        if (modeRef.current === "webaudio" && ctxRef.current) {
          ctxRef.current.suspend();
        } else {
          audio.pause();
        }
      } else if (playingRef.current) {
        if (modeRef.current === "webaudio" && ctxRef.current) {
          ctxRef.current.resume();
        } else {
          audio.play().catch(() => {
            playingRef.current = false;
            setIsPlaying(false);
          });
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(nudgeTimer);
      gestures.forEach((g) => window.removeEventListener(g, handleFirstGesture, true));
      document.removeEventListener("visibilitychange", handleVisibility);
      if (fadeRef.current) clearInterval(fadeRef.current);
      if (checkRef.current) clearTimeout(checkRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [play, ramp]);

  return { isPlaying, isInvite, isNudge, toggle };
}
