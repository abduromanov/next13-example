import { ThemeOverride } from "@chakra-ui/react";

const theme: ThemeOverride = {
  colors: {
    brand: {
      400: '#5fd3b2',
      500: '#34BF98',
      600: '#2ca07f',
    },
    brandSecondary: {
      400: '#f48157',
      500: '#f15d27',
      600: '#d8440e',
    }
  },
  components: {
    Skeleton: {
      baseStyle: {
        rounded: 'full'
      }
    },
    Button: {
      variants: {
        solid: {
          color: 'white',
          bg: 'brand.500',
          _hover: {
            bg: 'brand.600'
          }
        }
      },
    },
    Input: {
      defaultProps: {
        variant: 'filled'
      }
    }
  }
}

export default theme;