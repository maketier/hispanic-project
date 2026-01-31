import { Inter, Playfair_Display } from "next/font/google";

/**
 * Brand Pack: Fonts
 * Swap imports/configs per client. Token names MUST stay stable.
 */

export const bodyFont = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-body",
});

export const displayFont = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display",
});
