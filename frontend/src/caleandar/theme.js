import { createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
         100: "#1A252F",
          200: "#1A252F",
          300: "#1A252F",
          400: "#1A252F",
          500: "#1A252F",
          600: "#1A252F",
          700: "#1A252F",
          800: "#1A252F",
          900: "#1A252F",
        },
        primary: {//katbadal lon nta3 lon ntaa3 background nta3 la pages
             100: "#E7E4E5",
          200: "#E7E4E5",
          300: "#B07AB4",//katbadal lon nta3( All-day event ,Timed event)
          400: "#E7E4E5",
          500: "#E7E4E5",
          600: "#E7E4E5",
          700: "#E7E4E5",
          800: "#E7E4E5",
          900: "#E7E4E5",
        },
        greenAccent: {//katbadal lon nta3 l partie li 3la lisar
         100: "#B07AB4",
          200: "#B07AB4",
          300: "#B07AB4",
          400: "#B07AB4",
          500: "#B07AB4",
          600: "#B07AB4",
          700: "#B07AB4",
          800: "#B07AB4",
          900: "#B07AB4",
        },
        redAccent: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
        blueAccent: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
      }
    : {
        grey: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
        primary: {
         100: "#1A252F",
          200: "#1A252F",
          300: "#1A252F",
          400: "#1A252F",
          500: "#1A252F",
          600: "#1A252F",
          700: "#1A252F",
          800: "#1A252F",
          900: "#1A252F",
        },
        greenAccent: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
        redAccent: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
        blueAccent: {
         100: "#c71010",
          200: "#c71010",
          300: "#c71010",
          400: "#c71010",
          500: "#c71010",
          600: "#c71010",
          700: "#c71010",
          800: "#c71010",
          900: "#c71010",
        },
      }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);


    return {
        palette:{
            mode: mode,
            ...(mode === "dark" ?{
                primary:{
                    main: colors.primary[500],
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    main: colors.grey[500],
                    dark: colors.grey[700],
                    light: colors.grey[100],
                },
                background:{
                    default: colors.primary[500],
                },
            }:{
                                primary:{
                    main: colors.primary[100],
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    main: colors.grey[500],
                    dark: colors.grey[700],
                    light: colors.grey[100],
                },
                background:{
                    default: "#fcfcfc",
                },
            }
            ),
        },
        typography:{
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize:12,
            h1:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:40,
            },
                        h2:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:32,
            },
                        h3:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:24,
            },
                        h4:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:20,
            },
                        h5:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:16,
            },
                        h6:{
                fontFamily : ["Source Sans Pro", "sans-serif"].join(","),
                fontSize:14,
            },
        }
    }
};


export const ColorModeContext = createContext({
    toggleColorMode: () =>{}
});



export const useMode = () =>{
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev ==="light" ? "dark":"light")),
        }),[]
    );



    const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);


    return [theme, colorMode]
}
