"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const HOLD_MS = 2600;
const FADE_MS = 560;
const REVEAL_MS = 900;
const CREAM = "#F6EED4";

export function LogoIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [barOn, setBarOn] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let fadeTimer = 0;
    let holdTimer = 0;
    let barFrame = 0;

    barFrame = window.requestAnimationFrame(() => {
      if (!disposed) setBarOn(true);
    });

    holdTimer = window.setTimeout(() => {
      if (disposed) return;
      setFading(true);
      fadeTimer = window.setTimeout(() => {
        if (!disposed) setVisible(false);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(barFrame);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(holdTimer);
    };
  }, []);

  if (!visible) return null;

  const motionOff = Boolean(reduceMotion);

  return (
    <div
      className="fixed inset-0 z-[80] flex min-h-[100dvh] flex-col items-center"
      style={{
        background: CREAM,
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div className="flex min-h-0 w-full flex-1 items-center justify-center px-4">
        <div
          className="flex w-full max-w-[40rem] flex-col items-center"
          style={{
            opacity: revealed || motionOff ? 1 : 0,
            transform: revealed || motionOff ? "scale(1)" : "scale(0.97)",
            transition: motionOff
              ? "none"
              : `opacity ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <div className="relative w-[min(64vw,26rem)]">
            <Image
              src="/brand/oravi-lux-emblem.svg"
              alt=""
              width={580}
              height={497}
              priority
              unoptimized
              className="h-auto w-full"
              onLoad={() => setRevealed(true)}
            />
          </div>
          <p className="mt-6 px-2 text-center font-sans text-[0.95rem] font-medium tracking-[0.14em] text-[#6b4a28] uppercase md:mt-7 md:text-[1.2rem]">
            Concierge & Hospitality Services
          </p>
        </div>
      </div>

      <div className="flex w-full shrink-0 justify-center pb-[min(22vh,8rem)] pt-6">
        <div
          className="relative h-2 w-[min(48vw,20rem)] overflow-hidden rounded-full"
          style={{ background: "rgba(155, 118, 70, 0.18)" }}
        >
          <div
            className="relative h-full origin-left rounded-full"
            style={{
              width: "100%",
              transform: barOn || motionOff ? "scaleX(1)" : "scaleX(0)",
              background:
                "linear-gradient(90deg, #9a7348 0%, #d4b27a 42%, #f0e2c0 58%, #c49a62 100%)",
              boxShadow: "0 0 10px rgba(196, 154, 98, 0.45)",
              transition: motionOff
                ? "none"
                : `transform ${HOLD_MS}ms cubic-bezier(0.22, 0.82, 0.28, 1)`,
            }}
          >
            {!motionOff && barOn && (
              <span className="oravi-intro-sheen pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
