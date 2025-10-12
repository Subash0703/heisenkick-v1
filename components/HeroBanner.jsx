"use client";

import LightRays from "@/utils/LightRays";
import React from "react";

export const HeroBanner = () => {
    return (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <LightRays
                raysOrigin="top-center"
                raysColor="#388E3C"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={8}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays rounded-2xl overflow-hidden"
                fadeDistance={5}
            />
        </div>
    )
};