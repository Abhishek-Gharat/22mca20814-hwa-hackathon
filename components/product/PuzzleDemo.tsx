"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, type MotionValue } from "framer-motion";
import { CheckCircle, Sparkles, RefreshCw } from "lucide-react";

type Stage = "press" | "rotate" | "slide" | null;

const STAGES: { id: Stage; label: string; hint: string }[] = [
  { id: "press", label: "01 · Press", hint: "Hold the pad to release stage one" },
  { id: "rotate", label: "02 · Rotate", hint: "Turn the dial to align the track" },
  { id: "slide", label: "03 · Slide", hint: "Slide the bolt to open the chamber" },
];

const ORDER: Stage[] = ["press", "rotate", "slide"];

export function PuzzleDemo() {
  const [stage, setStage] = useState<Stage>("press");
  const [solved, setSolved] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPress = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  useEffect(() => clearPress, [clearPress]);

  const completePress = useCallback(() => {
    clearPress();
    setStage("rotate");
  }, [clearPress]);

  const rotateDeg = useMotionValue(0);
  const slideX = useMotionValue(0);

  const completeRotate = useCallback(() => {
    setStage("slide");
  }, []);

  const completeSlide = useCallback(() => {
    setStage(null);
    setSolved(true);
  }, []);

  const reset = useCallback(() => {
    clearPress();
    setStage("press");
    setSolved(false);
    rotateDeg.set(0);
    slideX.set(0);
  }, [clearPress, rotateDeg, slideX]);

  const status = (id: Stage) => {
    if (solved) return "done";
    const currentIndex = stage ? ORDER.indexOf(stage) : 0;
    const idIndex = ORDER.indexOf(id);
    if (stage === id) return "active";
    if (idIndex < currentIndex) return "done";
    return "locked";
  };

  const colors: Record<string, string> = {
    active: "#FF4D12",
    done: "#2F4A3C",
    locked: "#6E6A61",
  };

  return (
    <section className="relative z-10 isolation" aria-label="Switchback interactive demo">
      <div className="max-w-1024 mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-steel">Experience</p>
            <h2 className="text-2.6rem font-display tracking-tight">Solve it in three stages</h2>
          </div>
          {solved && (
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-[0.85rem] font-mono hover:bg-ink hover:text-white transition-colors">
              <RefreshCw size={16} strokeWidth={2} /> Reset
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STAGES.map((s) => {
            const st = status(s.id);
            const isCurrent = stage === s.id && !solved;
            const isDone = st === "done";
            const borderColor = colors[st];
            const bg = isCurrent ? "#FF4D12/12" : st === "done" ? "#2F4A3C/12" : "#FBFAF7";
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: s.id === "press" ? 0 : s.id === "rotate" ? 0.15 : 0.3 }}
                className="relative rounded-3xl border p-8 min-h-[320px] flex flex-col"
                style={{ borderColor, backgroundColor: bg }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-mono text-xs font-bold tracking-wider ${isCurrent || isDone ? "text-ink" : "text-steel"}`}>
                    {s.label}
                  </span>
                  {isDone && <CheckCircle size={16} strokeWidth={2.5} fill="#2F4A3C" className="text-moss" />}
                  {!isCurrent && !isDone && !solved && (
                    <span className="w-2 h-2 rounded-full bg-steel" />
                  )}
                </div>

                {s.id === "press" ? (
                  <PressZone isActive={isCurrent} onComplete={completePress} />
                ) : s.id === "rotate" ? (
                  <RotateZone isActive={isCurrent} rotation={rotateDeg} onComplete={completeRotate} />
                ) : (
                  <SlideZone isActive={isCurrent} x={slideX} onComplete={completeSlide} />
                )}

                <p className="mt-6 text-[0.85rem] font-mono text-steel leading-relaxed">{s.hint}</p>
                {isCurrent && (
                  <p className="mt-2 text-[0.75rem] font-mono text-ember font-bold uppercase tracking-wider">Unlocked · act now</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {solved && (
          <div className="mt-16 rounded-3xl bg-ink p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <Sparkles size={32} className="mx-auto mb-8 text-ember" />
            <h3 className="font-display text-2xl tracking-tight mb-3">Challenge complete.</h3>
            <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed">
              All three stages solved — the treat chamber is open. Switchback is ready to ship.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => (window.location.href = "/product/switchback")}
                className="inline-flex items-center justify-center rounded-full bg-ember px-7 py-3 text-sm font-display font-semibold hover:bg-ember-deep transition-colors"
              >
                Order Switchback
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PressZone({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
  const [held, setHeld] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setHeld(true);
    timer.current = setTimeout(() => {
      setHeld(false);
      onComplete();
    }, 600);
  };
  const stop = () => {
    setHeld(false);
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      className="flex flex-col items-center justify-center h-40 rounded-2xl border-2 border-dashed cursor-pointer"
      style={{
        borderColor: isActive ? "#FF4D12" : "#E2DCD0",
        backgroundColor: held ? "#FF4D12/20" : "#FBFAF7",
      }}
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 relative shadow-inner"
        style={{
          backgroundColor: isActive ? "#FF4D12" : "#17140F",
          boxShadow: held
            ? "0 0 0 8px rgba(255,77,18,0.35), inset 0 2px 4px rgba(0,0,0,0.25)"
            : "0 0 0 4px rgba(255,255,255,0.5), inset 0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white" />
        {held && <div className="absolute inset-0 rounded-full animate-ping bg-ember/40" />}
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
        {held ? "Holding…" : isActive ? "Press & hold" : "Locked"}
      </span>
    </motion.div>
  );
}

function RotateZone({ isActive, rotation, onComplete }: { isActive: boolean; rotation: MotionValue<number>; onComplete: () => void }) {
  const onDragEnd = () => {
    if (Math.abs(rotation.get()) > 85) onComplete();
  };
  return (
    <motion.div
      style={{ rotate: rotation }}
      drag="x"
      onDragEnd={onDragEnd}
      className="flex flex-col items-center justify-center h-40 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center mb-3 group"
        style={{
          borderColor: isActive ? "#FF4D12" : "#E2DCD0",
          backgroundColor: "#FBFAF7",
        }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-ink flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          style={{
            rotate: rotation,
            backgroundColor: Math.abs(rotation.get()) > 85 ? "#2F4A3C" : "#17140F",
          }}
        >
          <div className="w-4 h-4 bg-white rounded-full" />
        </motion.div>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-ink" />
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
        {Math.abs(rotation.get()) > 85 ? "Aligned" : isActive ? "Rotate dial" : "Locked"}
      </span>
    </motion.div>
  );
}

function SlideZone({ isActive, x, onComplete }: { isActive: boolean; x: MotionValue<number>; onComplete: () => void }) {
  const onDragEnd = () => {
    if (x.get() >= 115) onComplete();
  };
  return (
    <motion.div
      style={{ x }}
      drag="x"
      dragConstraints={{ left: 0, right: 120 }}
      onDragEnd={onDragEnd}
      className="flex flex-col items-center justify-center h-40 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-36 h-20 rounded-xl border-2 border-dashed flex items-center justify-center mb-3"
        style={{ borderColor: isActive ? "#FF4D12" : "#E2DCD0", backgroundColor: "#FBFAF7" }}
      >
        <div className="w-28 h-6 rounded-full bg-steel/20 absolute left-2 top-1/2 -translate-y-1/2" />
        <motion.div
          className="w-12 h-12 rounded-full bg-ink shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          style={{
            x,
            backgroundColor: x.get() >= 115 ? "#2F4A3C" : "#17140F",
          }}
        />
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-steel">
        {x.get() >= 115 ? "Opened" : isActive ? "Slide bolt" : "Locked"}
      </span>
    </motion.div>
  );
}
