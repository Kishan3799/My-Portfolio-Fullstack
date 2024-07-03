import { useCallback, useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim"; 

const ParticleBg = ()=> {
    
  const [ init, setInit ] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
      initParticlesEngine(async (engine) => {
        
          await loadFull(engine);
          //await loadBasic(engine);
      }).then(() => {
          setInit(true);
      });
  }, []);

  const particlesLoaded = (container) => {
      console.log(container);
  };

  return (
    <>
    { init && <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
          background: {
              color: {
                  value: "#f9f6ee",
              },
          },
          fullScreen: {
            zIndex: -1,
          }, 
          fpsLimit: 120,
          interactivity: {
              events: {
                  onClick: {
                      enable: true,
                      mode: "push",
                  },
                  onHover: {
                      enable: true,
                      mode: "repulse",
                  },
                  resize: true,
              },
              modes: {
                  push: {
                      quantity: 4,
                  },
                  repulse: {
                      distance: 150,
                      duration: 0.4,
                  },
              },
          },
          particles: {
              color: {
                  value: "#252525",
              },
              links: {
                  color: "#252525",
                  distance: 150,
                  enable: true,
                  opacity: 0.7,
                  width: 1,
              },
              move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                      default: "bounce",
                  },
                  random: false,
                  speed: 6,
                  straight: false,
              },
              number: {
                  density: {
                      enable: true,
                      area: 800,
                  },
                  value: 300,
              },
              opacity: {
                  value: 0.7,
              },
              shape: {
                  type: "square",
              },
              size: {
                  value: { min: 1, max: 5 },
              },
          },
          detectRetina: true,
      }}
  />
}
</>
  )
}

export default ParticleBg
