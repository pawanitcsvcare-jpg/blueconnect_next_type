'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const VCARE_SYSTEM_NOTICE =
  'You are about to access a Vcare corporation system. This computer system and the data therein are property of the Vcare corporation and its clients and provided for official information and use only. Access to this system is restricted to authorized users only. Unauthorized access, use, or modification of this computer system or of the data contained herein, or in transit to/from this system, may constitute a violation of federal or state criminal laws. Anyone who accesses a computer system without authorization or exceeds his or her access authority, or obtains, alters, damages, destroys, or discloses information, or prevents authorized use of information on the computer system, may be subject to administrative penalties, fines or imprisonment.'

function LoginPageBackground() {
  const uid = React.useId().replace(/:/g, '')
  const g1 = `${uid}-g1`
  const g2 = `${uid}-g2`
  const g3 = `${uid}-g3`
  const p1 = `${uid}-dots`

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-[#e4e9f2]"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 120% 80% at 0% 0%, rgb(191 219 254 / 0.45), transparent 55%)',
            'radial-gradient(ellipse 90% 70% at 100% 20%, rgb(147 197 253 / 0.35), transparent 50%)',
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgb(203 213 225 / 0.5), transparent 45%)',
            'linear-gradient(165deg, rgb(248 250 252) 0%, rgb(226 232 240) 45%, rgb(219 234 254 / 0.6) 100%)',
          ].join(', '),
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full text-slate-400/25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id={g2} cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#4169E1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={g3} cx="80%" cy="85%" r="55%">
            <stop offset="0%" stopColor="#1e4d7a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1e4d7a" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={p1}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${g2})`} />
        <rect width="100%" height="100%" fill={`url(#${g3})`} />
        <rect width="100%" height="100%" fill={`url(#${p1})`} />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.2"
          d="M0 520 C 280 480, 360 620, 720 560 S 1160 440, 1440 500"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.15"
          d="M0 680 Q 400 600 800 660 T 1440 620"
        />
        <g fill={`url(#${g1})`} opacity="0.9">
          <circle cx="200" cy="160" r="120" />
          <circle cx="1240" cy="220" r="160" />
          <circle cx="1080" cy="780" r="200" />
        </g>
        <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.18">
          <path d="M100 720 L 220 640 L 380 700 L 520 580 L 680 660" />
          <path d="M900 180 L 1020 260 L 1180 200 L 1320 320" />
        </g>
        <g fill="currentColor" opacity="0.22">
          <circle cx="220" cy="640" r="4" />
          <circle cx="380" cy="700" r="4" />
          <circle cx="520" cy="580" r="4" />
          <circle cx="1020" cy="260" r="4" />
          <circle cx="1180" cy="200" r="4" />
        </g>
      </svg>
      <svg
        className="absolute -right-[10%] -top-[8%] h-[min(55vw,520px)] w-[min(55vw,520px)] text-[#4169E1]/15"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          d="M40 200 Q 200 80 360 200"
          opacity="0.6"
        />
      </svg>
      <svg
        className="absolute -bottom-[12%] -left-[8%] h-[min(48vw,440px)] w-[min(48vw,440px)] text-[#1e4d7a]/20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M20 320 C 120 200, 200 360, 380 240"
        />
        <circle cx="120" cy="240" r="6" fill="currentColor" opacity="0.4" />
        <circle cx="280" cy="300" r="5" fill="currentColor" opacity="0.35" />
      </svg>
    </div>
  )
}

/** Decorative SVGs confined to the login form column (behind the card). */
function LoginFormPanelBackground() {
  const uid = React.useId().replace(/:/g, '')
  const plusPat = `${uid}-fp-plus`
  const rg1 = `${uid}-fp-rg1`
  const rg2 = `${uid}-fp-rg2`
  const lg1 = `${uid}-fp-lg1`
  const petalFill = `${uid}-fp-petalFill`

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full text-slate-400/90"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 900 1100"
      >
        <defs>
          <pattern
            id={plusPat}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              fill="currentColor"
              fillOpacity="0.22"
              d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"
            />
          </pattern>
          <radialGradient id={rg1} cx="18%" cy="22%" r="65%">
            <stop offset="0%" stopColor="#4169E1" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#4169E1" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={rg2} cx="88%" cy="72%" r="55%">
            <stop offset="0%" stopColor="#1e4d7a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1e4d7a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={lg1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${rg1})`} />
        <rect width="100%" height="100%" fill={`url(#${rg2})`} />
        <rect width="100%" height="100%" fill={`url(#${plusPat})`} opacity="0.85" />
        <circle
          cx="480"
          cy="420"
          r="280"
          fill={`url(#${lg1})`}
          opacity="0.85"
        />
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
          <path d="M0 780 C 160 720, 280 860, 450 800 S 720 680, 900 740" />
          <path d="M40 980 Q 300 900 520 960 T 900 920" />
        </g>
        <g fill="currentColor" opacity="0.2">
          <circle cx="200" cy="760" r="3.5" />
          <circle cx="450" cy="800" r="3.5" />
          <circle cx="720" cy="700" r="3.5" />
        </g>
        {/* Right: tilted wire quads + constellation (distinct from prior blobs/ribbons) */}
        <g fill="none" strokeLinejoin="round" opacity="0.92">
          <polygon
            stroke="#4169E1"
            strokeOpacity="0.2"
            strokeWidth="1.15"
            points="612,88 868,168 712,328 528,236"
          />
          <polygon
            stroke="#38bdf8"
            strokeOpacity="0.22"
            strokeWidth="1"
            points="688,368 878,452 788,608 578,520"
          />
          <polygon
            stroke="#6366f1"
            strokeOpacity="0.16"
            strokeWidth="0.9"
            points="638,628 888,708 758,908 518,792"
          />
        </g>
        <g
          stroke="#1e4d7a"
          strokeOpacity="0.22"
          strokeWidth="0.75"
          strokeLinecap="round"
        >
          <line x1="628" y1="132" x2="732" y2="198" />
          <line x1="732" y1="198" x2="818" y2="142" />
          <line x1="818" y1="142" x2="792" y2="268" />
          <line x1="732" y1="198" x2="668" y2="468" />
          <line x1="668" y1="468" x2="832" y2="538" />
          <line x1="832" y1="538" x2="708" y2="728" />
          <line x1="708" y1="728" x2="598" y2="768" />
        </g>
        <g fill="#4169E1">
          <circle cx="628" cy="132" r="3.5" fillOpacity="0.32" />
          <circle cx="732" cy="198" r="3" fillOpacity="0.3" />
          <circle cx="818" cy="142" r="2.8" fillOpacity="0.28" />
          <circle cx="792" cy="268" r="2.5" fillOpacity="0.26" />
          <circle cx="668" cy="468" r="3.2" fillOpacity="0.3" />
          <circle cx="832" cy="538" r="3" fillOpacity="0.28" />
          <circle cx="708" cy="728" r="3.5" fillOpacity="0.32" />
          <circle cx="598" cy="768" r="2.8" fillOpacity="0.24" />
        </g>
      </svg>
      {/* Top-right: 6-petal radial blossom (ellipses from corner) */}
      <svg
        className="absolute -right-[10%] top-[2%] h-[min(52vw,420px)] w-[min(52vw,420px)]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 320"
        aria-hidden
      >
        <defs>
          <radialGradient id={petalFill} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4169E1" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(248 36)">
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <ellipse
              key={deg}
              cx={0}
              cy={0}
              rx={88}
              ry={22}
              fill={`url(#${petalFill})`}
              transform={`rotate(${deg})`}
              opacity={0.95}
            />
          ))}
        </g>
        <circle cx="248" cy="36" r="10" fill="#38bdf8" fillOpacity="0.14" />
        <circle cx="248" cy="36" r="4" fill="#4169E1" fillOpacity="0.35" />
        <g
          stroke="#4169E1"
          strokeOpacity="0.14"
          strokeWidth="0.65"
          strokeLinecap="round"
        >
          <line x1="300" y1="8" x2="276" y2="28" />
          <line x1="312" y1="22" x2="284" y2="48" />
          <line x1="318" y1="40" x2="292" y2="62" />
        </g>
      </svg>
      <svg
        className="absolute bottom-[6%] -left-[10%] h-[min(38vw,320px)] w-[min(38vw,320px)] text-[#1e4d7a]/16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          d="M8 160 C 56 96, 96 176, 188 112"
        />
        <circle cx="72" cy="132" r="5" fill="currentColor" opacity="0.45" />
        <circle cx="148" cy="96" r="4" fill="currentColor" opacity="0.4" />
      </svg>
      {/* Bottom-right: molecular graph (nodes + bonds) */}
      <svg
        className="absolute bottom-[8%] right-[4%] h-48 w-48 sm:h-56 sm:w-56 lg:bottom-[10%] lg:right-[5%]"
        viewBox="0 0 220 220"
        aria-hidden
      >
        <g
          stroke="#4169E1"
          strokeOpacity="0.24"
          strokeWidth="1.25"
          strokeLinecap="round"
        >
          <line x1="110" y1="38" x2="172" y2="98" />
          <line x1="172" y1="98" x2="110" y2="152" />
          <line x1="110" y1="152" x2="48" y2="98" />
          <line x1="48" y1="98" x2="110" y2="38" />
          <line x1="110" y1="38" x2="110" y2="152" />
          <line x1="172" y1="98" x2="148" y2="178" />
          <line x1="110" y1="152" x2="148" y2="178" />
          <line x1="48" y1="98" x2="148" y2="178" />
          <line x1="110" y1="38" x2="188" y2="52" />
          <line x1="188" y1="52" x2="172" y2="98" />
        </g>
        <g fill="#4169E1">
          <circle cx="110" cy="38" r="7" fillOpacity="0.32" />
          <circle cx="172" cy="98" r="6.5" fillOpacity="0.3" />
          <circle cx="110" cy="152" r="7" fillOpacity="0.32" />
          <circle cx="48" cy="98" r="6" fillOpacity="0.28" />
          <circle cx="148" cy="178" r="7.5" fillOpacity="0.34" />
          <circle cx="188" cy="52" r="5" fillOpacity="0.26" />
        </g>
        <circle
          cx="110"
          cy="95"
          r="18"
          fill="none"
          stroke="#38bdf8"
          strokeOpacity="0.14"
          strokeWidth="0.8"
          strokeDasharray="3 8"
        />
      </svg>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [remember, setRemember] = React.useState(false)
  const brandBDecorId = React.useId().replace(/:/g, '')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success('Signed in successfully')
    router.push('/dashboard')
  }

  return (
    <div className="relative min-h-svh overflow-hidden">
      <LoginPageBackground />

      <div className="relative z-10 flex min-h-svh flex-col lg:flex-row">
      {/* Brand panel — separate from form (split layout) */}
      <aside
        className={cn(
          'relative flex min-h-[min(100%,520px)] flex-col overflow-hidden px-8 py-10 text-white sm:px-12 lg:min-h-svh lg:w-[44%] lg:max-w-2xl lg:py-14',
          'bg-gradient-to-br from-[#152b98] via-[#265ac9] to-[#4c41e1]'
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* “B” + simple 3D-style orb below (white / opacity only) */}
        <svg
          className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 select-none text-white/20 sm:h-56 sm:w-56 lg:-right-4 lg:h-68 lg:w-68"
          viewBox="0 0 100 118"
          aria-hidden
        >
          <style type="text/css">{`
            @keyframes login-brand-b-float {
              0%,
              100% {
                transform: translateY(0) scale(1);
                opacity: 1;
              }
              50% {
                transform: translateY(-3.5px) scale(1.035);
                opacity: 0.82;
              }
            }
            .login-brand-b-float {
              transform-box: fill-box;
              transform-origin: center;
              animation: login-brand-b-float 3.4s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .login-brand-b-float {
                animation: none;
              }
            }
          `}</style>
          <defs>
            <radialGradient
              id={`${brandBDecorId}-orb`}
              cx="32%"
              cy="28%"
              r="72%"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
            </radialGradient>
            <linearGradient
              id={`${brandBDecorId}-orb-shade`}
              x1="18%"
              y1="18%"
              x2="88%"
              y2="92%"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse
            cx="50"
            cy="110"
            rx="17"
            ry="4.5"
            fill="#fff"
            fillOpacity={0.12}
          />
          {/* Sphere body */}
          <circle
            cx="50"
            cy="95"
            r="12.5"
            fill={`url(#${brandBDecorId}-orb)`}
          />
          <circle
            cx="50"
            cy="95"
            r="12.5"
            fill={`url(#${brandBDecorId}-orb-shade)`}
          />
          <circle
            cx="50"
            cy="95"
            r="12.5"
            fill="none"
            stroke="#fff"
            strokeOpacity={0.14}
            strokeWidth="0.4"
          />
          {/* Specular highlight */}
          <ellipse
            cx="45"
            cy="89"
            rx="3.2"
            ry="2.4"
            fill="#fff"
            fillOpacity={0.28}
            transform="rotate(-28 45 89)"
          />
          <text
            className="login-brand-b-float"
            x="50"
            y="44"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            style={{
              fontSize: 90,
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            B
          </text>
        </svg>

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col gap-6">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                <Shield className="size-7 text-white" aria-hidden />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">BlueConnects</p>
                <p className="flex items-center gap-2 text-sm text-white/80">
                  <span
                    className="size-2 shrink-0 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40"
                    aria-hidden
                  />
                  Secure Access
                </p>
              </div>
            </div>
            <h1 className="max-w-md text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Sign in to manage subscribers, reports, and inventory.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Secure access to your dashboard. Use your organization credentials.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:min-h-[120px]">
            <p className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
              System use notice
            </p>
            <div
              className="mt-2 text-[14px] leading-relaxed text-white/75 text-justify"
              role="region"
              aria-label="Vcare corporation system use notice" >
              {VCARE_SYSTEM_NOTICE}
            </div>
          </div>

          <p className="shrink-0 text-xs text-white/60">
          Copyright By © {new Date().getFullYear()} Telgoo5. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Form panel — SVG decor lives here (behind card) */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#f0f8ff] px-4 py-10 backdrop-blur-[2px] sm:px-8 lg:px-12">
        <LoginFormPanelBackground />
        <div className="relative z-10 w-full max-w-[520px] rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-sm sm:px-10 sm:py-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
            Sign in to your account
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Enter your Username and password to continue.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="login-email">Username</Label>
              <Input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                required
                className="mb-0"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Link
                  href="#"
                  className="text-xs font-medium text-[#4169E1] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className="mb-0"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="login-remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked)}
              />
              <Label
                htmlFor="login-remember"
                className="cursor-pointer font-normal text-neutral-600"
              >
                Remember me on this device
              </Label>
            </div>

            <Button type="submit" variant="primary" className="h-11 w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-neutral-500">
            Need an account?{' '}
            <Link
              href="#"
              className="font-medium text-[#4169E1] hover:underline"
            >
              Contact your administrator
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
