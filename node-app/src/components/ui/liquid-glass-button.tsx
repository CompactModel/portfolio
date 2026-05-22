import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const glassBoxShadow =
  "0 0 6px rgba(0,0,0,0.03),0 2px 6px rgba(0,0,0,0.08)," +
  "inset 3px 3px 0.5px -3px rgba(0,0,0,0.9)," +
  "inset -3px -3px 0.5px -3px rgba(0,0,0,0.85)," +
  "inset 1px 1px 1px -0.5px rgba(0,0,0,0.6)," +
  "inset -1px -1px 1px -0.5px rgba(0,0,0,0.6)," +
  "inset 0 0 6px 6px rgba(0,0,0,0.12)," +
  "inset 0 0 2px 2px rgba(0,0,0,0.06)," +
  "0 0 12px rgba(255,255,255,0.15)"

const sizeMap: Record<string, React.CSSProperties> = {
  sm:      { height: '2rem',    padding: '0 1rem',    fontSize: 12, borderRadius: '9999px' },
  default: { height: '2.25rem', padding: '0 1rem',    fontSize: 14, borderRadius: '9999px' },
  lg:      { height: '2.5rem',  padding: '0 1.5rem',  fontSize: 14, borderRadius: '9999px' },
  xl:      { height: '3rem',    padding: '0 2rem',    fontSize: 14, borderRadius: '9999px' },
  xxl:     { height: '3.5rem',  padding: '0 2.5rem',  fontSize: 14, borderRadius: '9999px' },
  icon:    { height: '2.25rem', width: '2.25rem',     padding: 0,   borderRadius: '9999px' },
}

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'xxl' | 'icon'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function LiquidButton({
  className,
  size = 'xxl',
  asChild = false,
  children,
  style,
  ...props
}: LiquidButtonProps) {
  const [hovered, setHovered] = React.useState(false)
  const Comp = asChild ? Slot : "button"
  const sz = sizeMap[size] ?? sizeMap['xxl']

  return (
    <>
      <Comp
        className={className}
        style={{
          position:       'relative',
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            8,
          whiteSpace:     'nowrap',
          fontWeight:     500,
          cursor:         'pointer',
          border:         'none',
          background:     'transparent',
          outline:        'none',
          transition:     'transform 300ms ease',
          transform:      hovered ? 'scale(1.05)' : 'scale(1)',
          ...sz,
          ...style,
        }}
        onMouseEnter={e => { setHovered(true); props.onMouseEnter?.(e) }}
        onMouseLeave={e => { setHovered(false); props.onMouseLeave?.(e) }}
        {...props}
      >
        {/* Glass bubble overlay */}
        <div style={{
          position:     'absolute',
          inset:        0,
          borderRadius: '9999px',
          boxShadow:    glassBoxShadow,
          transition:   'all 200ms',
          pointerEvents: 'none',
          zIndex:        0,
        }} />

        {/* Backdrop distortion layer */}
        <div style={{
          position:       'absolute',
          inset:          0,
          borderRadius:   '0.375rem',
          overflow:       'hidden',
          zIndex:         -1,
          isolation:      'isolate',
          backdropFilter: 'url("#container-glass")',
        }} />

        {/* Content */}
        <div style={{ pointerEvents: 'none', zIndex: 10, position: 'relative' }}>
          {children}
        </div>

        <GlassFilter />
      </Comp>
    </>
  )
}

function GlassFilter() {
  return (
    <svg style={{ display: 'none' }}>
      <defs>
        <filter
          id="container-glass"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
