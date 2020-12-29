import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

// Convert scale back to MD color scale
const convertColorScales = (colors) => {
  const missingScales = [200, 400, 600, 800];

  for (const key in colors) {
    const scale = colors[key];

    for (const missingScale in missingScales) {
      const currentMissingScale = missingScales[missingScale];
      scale[currentMissingScale] = scale[currentMissingScale + 100];
    }
  }
  return colors;
};

const defaultFont =
  "Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif";

const fonts = {
  body: defaultFont,
  heading: defaultFont,
};

const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.825rem",
  md: "0.975rem",
  lg: "1rem",
  xl: "1.125rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

const letterSpacings = {
  normal: "normal",
};

const wordSpacings = {
  normal: "normal",
};

const textStyles = {
  h1: {
    lineHeight: "110%",
  },
  h2: {
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h3: {
    lineHeight: "110%",
  },
  h4: {
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h5: {
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h6: {
    fontWeight: "semibold",
    lineHeight: "110%",
  },
};

const textColors = {
  heading: "#1D2F2F",
  body: "#40454D",
  secondary: "#687682",
  placeholder: "#ABB3BE",
};

const primaryColors = {
  // Primary colors
  blue: {
    50: "#E6F0FC",
    100: "#CBDFF9",
    300: "#88B6F3",
    500: "#1A73E8",
    700: "#145AB6",
    900: "#0B346A",
  },
  red: {
    50: "#FCEBEA",
    100: "#FAD5D2",
    300: "#F49D97",
    500: "#E62719",
    700: "#B71F14",
    900: "#6D120C",
  },
  orange: {
    50: "#FCF1E3",
    100: "#F9E2C5",
    300: "#F1BF7D",
    500: "#E88F1A",
    700: "#B77114",
    900: "#6D430C",
  },
  green: {
    50: "#E7FCE9",
    100: "#AFF7B4",
    300: "#5EEE68",
    500: "#17D224",
    700: "#11991A",
    900: "#0C6F13",
  },
};

const secondaryColors = {
  // Secondary colors
  indigo: {
    50: "#ECEBFD",
    100: "#D7D4FA",
    300: "#A19BF5",
    500: "#281AE8",
    700: "#1F14B6",
    900: "#120B68",
  },
  violet: {
    50: "#F4EAFC",
    100: "#E9D2FA",
    300: "#CC97F4",
    500: "#8F1AE8",
    700: "#7014B7",
    900: "#410B6B",
  },
  fuschia: {
    50: "#FCEAFB",
    100: "#FAD4F8",
    300: "#F499EE",
    500: "#E81ADA",
    700: "#B814AD",
    900: "#6E0C67",
  },
  pink: {
    50: "#FCEAF2",
    100: "#FAD3E4",
    300: "#F499C0",
    500: "#E81A73",
    700: "#B8145B",
    900: "#6D0C36",
  },
  yellow: {
    50: "#FAFCE1",
    100: "#F5F8C1",
    300: "#E9F177",
    500: "#DAE81A",
    700: "#ADB814",
    900: "#686F0C",
  },
  teal: {
    50: "#E6FCF2",
    100: "#CBF9E5",
    300: "#87F2C4",
    500: "#1AE88F",
    700: "#14B871",
    900: "#0C6F44",
  },
  lime: {
    50: "#EEFCE3",
    100: "#DBF9C5",
    300: "#B1E16C",
    500: "#77CC00",
    700: "#5EA200",
    900: "#386100",
  },
  cyan: {
    50: "#E5FAFC",
    100: "#C9F6F9",
    300: "#83EBF2",
    500: "#1ADAE8",
    700: "#14ADB8",
    900: "#0C686F",
  },
};

const colors = {
  // Typography
  text: textColors,
  white: "#ffffff",
  // Gray
  gray: {
    50: "#F8F9FA",
    100: "#EBEDF0",
    200: "#DDE0E5",
    300: "#CED3D9",
    400: "#BDC4CC",
    500: "#ABB3BE",
    600: "#96A0AE",
    700: "#7D8A9A",
    800: "#616D7C",
    900: "#383F48",
  },
  ...convertColorScales(primaryColors),
  ...convertColorScales(secondaryColors),
};

const Button = {
  baseStyle: {
    fontSize: "md",
    lineHeight: "normal",
    fontWeight: "medium",
    _hover: {
      backgroundColor: "blue.700",
    },
  },
  variants: {
    solid: {
      border: "1px solid",
      borderColor: "blue.700",
    },
  },
  sizes: {
    md: {
      height: "2.25rem",
    },
  },
  defaultProps: {
    colorScheme: "blue",
    size: "md",
  },
};

const Input = {
  parts: ["field", "addon"],
  baseStyle: {
    field: {
      _hover: {
        backgroundColor: "gray.50",
      },
      _focus: {
        backgroundColor: "white",
        outlineColor: "blue.400",
      },
    },
  },
};

const Textarea = {
  baseStyle: {
    _hover: {
      backgroundColor: "gray.50",
    },
    _focus: {
      backgroundColor: "white",
      outlineColor: "blue.400",
    },
  },
};

const Link = {
  baseStyle: {
    color: "gray.800",
    fontWeight: "medium",
    _hover: {
      color: "blue.500",
    },
  },
};

const Alert = {
  parts: ["container"],
};

const components = { Alert, Button, Link, Input, Textarea };

const styles = {
  global: {
    "html, body": {
      fontSize: "md",
    },
  },
};

const theme = {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  letterSpacings,
  wordSpacings,
  textStyles,
  components,
  styles,
};

export default extendTheme(theme);
