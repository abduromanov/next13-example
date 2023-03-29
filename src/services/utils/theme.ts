import { ThemeOverride } from "@chakra-ui/react";

import font from "./font";

const theme: ThemeOverride = {
  fonts: {
    heading: `${font.style.fontFamily}`,
    body: `${font.style.fontFamily}`,
    mono: `${font.style.fontFamily}`,
  },
  fontWeights: {
    hairline: 200,
    medium: 600,
    extrabold: 900
  },
  colors: {
    brand: {
      400: "#5fd3b2",
      500: "#34BF98",
      600: "#2ca07f",
    },
    brandSecondary: {
      400: "#f48157",
      500: "#f15d27",
      600: "#d8440e",
    },
  },
  components: {
    Skeleton: {
      baseStyle: {
        rounded: "full",
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Input: {
      defaultProps: {
        variant: "filled",
      },
    },
  },
};

export default theme;
