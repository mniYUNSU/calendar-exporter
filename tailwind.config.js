import { getgroups } from 'node:process';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        highlight: 'var(--highlight)',
        highlightBlur: 'var(--highlightBlur)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        getgroupsbackground: 'var(--ggbackground)',
        getgroupsforeground: 'var(--ggforeground)',
        ggprimary: 'var(--ggprimary)',
        gghighlight: 'var(--gghighlight)',
        getgroupshighlightBlur: 'var(--gghighlightBlur)',
        getgroupssecondary: 'var(--ggsecondary)',
        getgroupsmuted: 'var(--ggmuted)',
        getgroupsborder: 'var(--ggborder)',
        ggaccent: 'var(--ggaccent)'
      }
    }
  },
  plugins: []
};
