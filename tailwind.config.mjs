import TailTypography from "@tailwindcss/typography";
import DaisyUI from "daisyui";

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {},
    },
    daisyui: {
      themes: [
        {
          daovotion: {          
            "primary": "#eebb55",
            "secondary": "#cca166",
            "accent": "#ea558a",
            "neutral": "#44af99",
            "base-100": "#003332",
            "info": "#ffdd99",
            "success": "#88efa8",
            "warning": "#ffb600",
            "error": "#Ec5847"
          }
        }
      ]
    },
    plugins: [TailTypography, DaisyUI]  
}