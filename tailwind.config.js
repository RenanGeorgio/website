/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}", 
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/views/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /grid-cols-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /col-span-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /col-start-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /justify-self-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /self-/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /max-w-/,
    },
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '768px',
      md: '940px',
      lg: '1200px',
      xl: '1600px',
    },
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
      success: "#0070f3",
      cyan: "#79FFE1",
    },
    spacing: new Array(351)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = `${val / 10}rem`
        return acc
      }, {}),
    opacity: new Array(21)
      .fill()
      .map((_, i) => i * 5)
      .reduce((acc, val) => {
        acc[val] = `${val / 100}`
        return acc
      }, {}),
    zIndex: new Array(11)
      .fill()
      .map((_, i) => i)
      .reduce((acc, val) => {
        acc[val] = val
        return acc
      }, {}),
    extend: {
      fontFamily: {
        inherit: 'inherit',
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      maxWidth: {
        xs: '20rem',
        sm: '30rem',
        md: '40rem',
        lg: '50rem',
        xl: '60rem',
        '2xl': '70rem',
        '3xl': '80rem',
        '4xl': '90rem',
        '5xl': '100rem',
        '6xl': '115rem',
        '7xl': '130rem',
        prose: '100ch',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
