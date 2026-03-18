"use client"

import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

export default function FloatingParticles() {
  const particlesInit = async (engine: any) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 30 },
          color: { value: "#EAB308" },
          shape: { type: "circle" }, // can use custom SVG for ₦
          opacity: { value: 0.6, random: true },
          size: { value: { min: 3, max: 8 } },
          move: {
            enable: true,
            speed: 0.8,
            direction: "top",
            outModes: "out"
          }
        },
        background: { color: "#0A0A0A" },
        detectRetina: true,
      }}
    />
  )
}
