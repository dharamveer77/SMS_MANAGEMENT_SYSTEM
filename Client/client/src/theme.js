import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      primary: {
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606"
      },
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      greenAccent: {
        100: "#d2f8e8",
        200: "#a5f1d1",
        300: "#77ebbb",
        400: "#4ae4a4",
        500: "#1ddd8d",
        600: "#17b171",
        700: "#118555",
        800: "#0c5838",
        900: "#062c1c"
      },
      redAccent: {
        100: "#ffd8d4",
        200: "#ffb0a9",
        300: "#ff897f",
        400: "#ff6154",
        500: "#ff3a29",
        600: "#cc2e21",
        700: "#992319",
        800: "#661710",
        900: "#330c08"
      },
      blueAccent: {
        100: "#d7ecec",
        200: "#aedad9",
        300: "#86c7c5",
        400: "#5db5b2",
        500: "#35a29f",
        600: "#2a827f",
        700: "#20615f",
        800: "#154140",
        900: "#0b2020"
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0",
        500: "#141b2d",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
      greenAccent: {
        100: "#d2f8e8",
        200: "#a5f1d1",
        300: "#77ebbb",
        400: "#4ae4a4",
        500: "#1ddd8d",
        600: "#17b171",
        700: "#118555",
        800: "#0c5838",
        900: "#062c1c"
      },
      redAccent: {
        100: "#ffd8d4",
        200: "#ffb0a9",
        300: "#ff897f",
        400: "#ff6154",
        500: "#ff3a29",
        600: "#cc2e21",
        700: "#992319",
        800: "#661710",
        900: "#330c08"
      },
      blueAccent: {
        100: "#d7ecec",
        200: "#aedad9",
        300: "#86c7c5",
        400: "#5db5b2",
        500: "#35a29f",
        600: "#2a827f",
        700: "#20615f",
        800: "#154140",
        900: "#0b2020"
      },
      // greenAccent: {
      //   100: "#0f2922",
      //   200: "#1e5245",
      //   300: "#2e7c67",
      //   400: "#3da58a",
      //   500: "#4cceac",
      //   600: "#70d8bd",
      //   700: "#94e2cd",
      //   800: "#b7ebde",
      //   900: "#dbf5ee",
      // },
      // redAccent: {
      //   100: "#2c100f",
      //   200: "#58201e",
      //   300: "#832f2c",
      //   400: "#af3f3b",
      //   500: "#db4f4a",
      //   600: "#e2726e",
      //   700: "#e99592",
      //   800: "#f1b9b7",
      //   900: "#f8dcdb",
      // },
      // blueAccent: {
      //   100: "#151632",
      //   200: "#2a2d64",
      //   300: "#3e4396",
      //   400: "#535ac8",
      //   500: "#6870fa",
      //   600: "#868dfb",
      //   700: "#a4a9fc",
      //   800: "#c3c6fd",
      //   900: "#e1e2fe",
      // },
    }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#cfcfcf",
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
