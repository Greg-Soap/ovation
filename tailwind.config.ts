import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        lg: '1024px',
      },
    },
    extend: {
      boxShadow: {
        top: '0px -75px 15px 30px rgba(189, 255, 0, 0.09)',

        progress:
          '6px 6px 10px -1px rgba(128, 128, 128, 1), -6px -6px 10px -1px rgba(128, 128, 128, 1)',
        progressInner:
          'inset 4px 4px 6px -1px rgba(207, 240, 115, 1), inset -4px -4px 6px -1px rgba(207, 240, 115, 1), -0.5px -0.5px 0px rgba(207, 240, 115, 1), 0.5px 0.5px 0px rgba(207, 240, 115, 1), 0px 12px 10px -10px rgba(207, 240, 115, 1)',
      },
      fontFamily: {
        heading: ['Istok Web', 'sans-serif'],
      },
      backgroundImage: {
        'vector-one': "url('/assets/images/vector.png')",
        'custom-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50.88%, rgba(255, 255, 255, 0.1) 100%)',
        'card-gradient': 'linear-gradient(180deg, #2B301B 0%, #121215 100%)',

        'profile-banner': "url('/assets/images/profile/image8.png')",
        'team-banner': "url('/assets/images/teams/teambg.png')",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        button: '#CFF073',
        buttonTextColor: '#0B0A10',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        ripple: {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.9)',
          },
        },
        shimmer: {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shimmer-width)) 0',
          },
        },
        'shine-pulse': {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          to: {
            'background-position': '0% 0%',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
      animation: {
        ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
        shimmer: 'shimmer 8s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
