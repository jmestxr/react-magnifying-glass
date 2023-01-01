import React from "react";
import "./magnifying-glass.css";
interface GlassProps {
    zoom: number;
    glassStyle: React.CSSProperties;
    offsetLeft?: number;
    offsetTop?: number;
}
export declare const MagnifyingGlass: ({ zoom, glassStyle, offsetLeft, offsetTop, }: GlassProps) => JSX.Element;
export {};
