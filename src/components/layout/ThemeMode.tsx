"use client"

import * as React from "react"
import { MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

function runThemeChange(apply: () => void) {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof (
      document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> }
      }
    ).startViewTransition === "function"
  ) {
    ;(
      document as Document & {
        startViewTransition: (cb: () => void) => { finished: Promise<void> }
      }
    ).startViewTransition(apply)
    return
  }
  apply()
}

export function ThemeModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [pressed, setPressed] = React.useState(false)
  const [burstId, setBurstId] = React.useState(0)
  const [knobPop, setKnobPop] = React.useState(false)
  const prevDarkRef = React.useRef<boolean | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" && resolvedTheme === "dark"))

  React.useEffect(() => {
    if (!mounted || prevDarkRef.current === null) {
      prevDarkRef.current = isDark
      return
    }
    if (prevDarkRef.current !== isDark) {
      prevDarkRef.current = isDark
      setKnobPop(true)
      const t = window.setTimeout(() => setKnobPop(false), 420)
      return () => window.clearTimeout(t)
    }
  }, [mounted, isDark])

  function toggle() {
    setBurstId((n) => n + 1)
    runThemeChange(() => setTheme(isDark ? "light" : "dark"))
  }

  return (
    <>
      <style>{`
        @keyframes theme-toggle-sun-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgb(251 191 36 / 0.45)); }
          50% { filter: drop-shadow(0 0 8px rgb(251 191 36 / 0.85)); }
        }
        @keyframes theme-toggle-star {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 0.95; transform: scale(1); }
        }
        @keyframes theme-toggle-ripple {
          0% { transform: scale(0.15); opacity: 0.65; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes theme-toggle-ripple-2 {
          0% { transform: scale(0.12); opacity: 0.45; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes theme-toggle-flash-overlay {
          0% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        .theme-toggle-ripple-a {
          animation: theme-toggle-ripple 0.58s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .theme-toggle-ripple-b {
          animation: theme-toggle-ripple-2 0.52s cubic-bezier(0.22, 1, 0.36, 1) 0.08s forwards;
        }
        .theme-toggle-flash-overlay {
          animation: theme-toggle-flash-overlay 0.48s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .theme-toggle-sun-anim,
          .theme-toggle-star-a,
          .theme-toggle-star-b,
          .theme-toggle-ripple-a,
          .theme-toggle-ripple-b,
          .theme-toggle-flash-overlay {
            animation: none !important;
          }
        }
      `}</style>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        disabled={!mounted}
        onClick={toggle}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        className={cn(
          "group relative h-9 w-[3.85rem] shrink-0 overflow-hidden rounded-full border-0 p-0",
          "transition-[transform,box-shadow,background-color] duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-wait disabled:opacity-90",
          pressed && "scale-[0.96]",
          isDark
            ? "bg-linear-to-br from-slate-700 via-[#2e3a52] to-indigo-950 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.5),inset_-1px_-1px_6px_rgba(129,140,248,0.12)]"
            : "bg-linear-to-br from-amber-50/90 via-neutral-200 to-sky-100/70 shadow-[inset_2px_2px_7px_rgba(0,0,0,0.08),inset_-2px_-2px_8px_rgba(255,255,255,0.95)]",
        )}
      >
        {/* Brief luminance flash (re-mounts each click via key) */}
        {burstId > 0 ? (
          <span
            key={`flash-${burstId}`}
            className={cn(
              "theme-toggle-flash-overlay pointer-events-none absolute inset-0 z-18 rounded-full",
              isDark ? "bg-indigo-200/35" : "bg-amber-100/45",
            )}
            aria-hidden
          />
        ) : null}

        {/* Click ripples */}
        {burstId > 0 ? (
          <span
            key={`ripples-${burstId}`}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            aria-hidden
          >
            <span
              className={cn(
                "absolute size-[42%] rounded-full border-2 border-white/55",
                "theme-toggle-ripple-a",
              )}
            />
            <span
              className={cn(
                "absolute size-[42%] rounded-full border border-amber-300/50",
                "theme-toggle-ripple-b",
              )}
            />
          </span>
        ) : null}

        {/* Ambient wash */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 z-0 rounded-full opacity-70 transition-opacity duration-500",
            isDark
              ? "bg-[radial-gradient(ellipse_85%_120%_at_78%_40%,rgba(99,102,241,0.38),transparent_58%)]"
              : "bg-[radial-gradient(ellipse_90%_120%_at_18%_35%,rgba(251,191,36,0.32),transparent_55%)]",
          )}
          aria-hidden
        />

        {/* Night “stars” */}
        {isDark ? (
          <>
            <span
              className="theme-toggle-star-a pointer-events-none absolute right-[2.15rem] top-1.5 z-0 size-1 rounded-full bg-indigo-100/90 shadow-[0_0_6px_rgb(199,210,254)]"
              style={{
                animation: "theme-toggle-star 2.4s ease-in-out infinite",
              }}
              aria-hidden
            />
            <span
              className="theme-toggle-star-b pointer-events-none absolute right-[1.35rem] top-2.5 z-0 size-0.5 rounded-full bg-white/80"
              style={{
                animation: "theme-toggle-star 3.1s ease-in-out infinite 0.4s",
              }}
              aria-hidden
            />
          </>
        ) : null}

        {/* Inactive sun (track, dark mode) */}
        <span
          className={cn(
            "pointer-events-none absolute left-2 top-1/2 z-0 -translate-y-1/2 transition-all duration-300",
            isDark ? "opacity-45" : "scale-75 opacity-0",
          )}
          aria-hidden
        >
          <Sun className="h-4 w-4 text-slate-200/90" strokeWidth={1.75} />
        </span>
        {/* Inactive moon (track, light mode) */}
        <span
          className={cn(
            "pointer-events-none absolute right-2 top-1/2 z-0 -translate-y-1/2 transition-all duration-300",
            isDark ? "scale-75 opacity-0" : "opacity-45",
          )}
          aria-hidden
        >
          <MoonStar className="h-4 w-4 text-violet-700/55" strokeWidth={1.75} />
        </span>

        {/* Knob */}
        <span
          className={cn(
            "pointer-events-none absolute left-[3px] top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]",
            "bg-linear-to-br from-white via-white to-neutral-100",
            "shadow-[2px_4px_10px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.65)_inset,-1px_-2px_6px_rgba(255,255,255,0.9)]",
            "ring-2 ring-white/80 ring-offset-0",
            isDark
              ? "translate-x-[1.725rem] ring-indigo-200/35"
              : "translate-x-0 ring-amber-100/90",
            "group-hover:shadow-[2px_5px_14px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.7)_inset]",
            knobPop && "scale-[1.12] rotate-[-10deg] duration-200 ease-out",
          )}
          aria-hidden
        >
          {isDark ? (
            <MoonStar
              className={cn(
                "h-[1.05rem] w-[1.05rem] text-indigo-700 transition-transform duration-200",
                knobPop && "scale-110 rotate-12",
              )}
              strokeWidth={2.25}
            />
          ) : (
            <Sun
              className={cn(
                "theme-toggle-sun-anim h-[1.05rem] w-[1.05rem] text-amber-500 transition-transform duration-200",
                knobPop && "scale-110 -rotate-12",
              )}
              strokeWidth={2.25}
              style={{
                animation: knobPop
                  ? undefined
                  : "theme-toggle-sun-glow 2.8s ease-in-out infinite",
              }}
            />
          )}
        </span>
      </button>
    </>
  )
}
