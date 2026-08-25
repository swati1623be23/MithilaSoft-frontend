// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-main)',
                sidebar: 'var(--bg-sidebar)',
                navbar: 'var(--bg-navbar)',
                primary: '#4F46E5',
                secondary: '#06B6D4',
                accent: '#F59E0B',
                success: '#22C55E',
                danger: '#EF4444',
                card: 'var(--bg-card)',
                cardHover: 'var(--bg-card-hover)',
                border: 'var(--border-color)',
                textPrimary: 'var(--text-primary)',
                textSecondary: 'var(--text-secondary)',
                textMuted: 'var(--text-muted)',
                hover: '#6366F1',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '18px',
            },
            animation: {
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'slide-in': 'slideIn 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
}