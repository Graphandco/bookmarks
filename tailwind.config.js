/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                title: ['"Anton"', "sans-serif"],
            },
        },
        container: {
            center: true,
        },
        fontSize: {
            sm: "0.8rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.563rem",
            "3xl": "2rem",
            "4xl": "2.441rem",
            "5xl": "3.052rem",
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        themes: [
            "dark",
            {
                dark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
                    // primary: "#1f242e",
                    // "primary-focus": "#232934",
                    primary: "#60a5fa",
                    // "primary-focus": "#232934",
                },
            },
        ],
    },
};
