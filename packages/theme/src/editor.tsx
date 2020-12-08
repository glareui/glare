import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

const defaultFont = "'Inter', sans-serif";

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
  heading: "#0e0f0f",
  body: "#101214",
  secondary: "#363b3f",
  placeholder: "#9f9fa0",
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
};

const Button = {
  baseStyle: {
    fontSize: "md",
    lineHeight: "normal",
    fontWeight: "medium",
    _hover: {
      backgroundColor: "black",
    },
  },
  variants: {
    solid: {
      border: "1px solid",
      borderColor: "grays.700",
    },
  },
  sizes: {
    md: {
      height: "2.25rem",
    },
  },
  defaultProps: {
    colorScheme: "black",
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
        outlineColor: "gray.400",
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
      outlineColor: "gray.900",
    },
  },
};

const Link = {
  baseStyle: {
    color: "black",
    fontWeight: "medium",
    _hover: {
      color: "gray.900",
    },
  },
};

const Alert = {
  parts: ["container"],
};

const components = { Alert, Button, Link, Input, Textarea };

const styles = {
  global: {
    ".glare-editor-ui": {
      fontSize: "md",
      fontFamily: "body",
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
