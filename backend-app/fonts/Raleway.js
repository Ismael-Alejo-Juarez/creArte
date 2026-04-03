import { Raleway } from "next/font/google";

// Raleway por defecto
export const raleway = Raleway({
    weight: "400",
    subsets: ["latin"]
});

// Raleway más fuerte
export const ralewayS = Raleway({
    weight: "700",
    subsets: ["latin"]
});

// Raleway para títulos de productos
export const ralewayPrd = Raleway({
    weight: "600",
    subsets: ["latin"]
});