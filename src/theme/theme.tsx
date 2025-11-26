"use client";
import { blue, grey, blueGrey, cyan } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { // 主色调
            main: blue[500],
            light: blue[100],
            dark: blue[800]
        },
        secondary: { // 表示强调突出的色调
            main: "#FE6B8B",
            light:"#FF8E53",
        },

        background: {
            default: '#fafafaff',
            paper: '#ffffff',
        },
        action: {
            active: blue[500],
            hover: 'rgba(0, 0, 0, 0.1)',
        },
        text:{
            // primary:black
            secondary: grey[500]
        }
        // sidebar: {
        //     background: {
        //         main: blueGrey[900],
        //         light: blueGrey[800],
        //         contrastText: "#ffffff",
        //     },
        //     active: {
        //         main: cyan[500], // 亮青色作为强调色
        //         light: cyan[100], // 浅青色作为选中背景
        //         dark: cyan[700],
        //     },
        // },
    },
});

// declare module '@mui/material/styles' {
//     interface SidebarColor {
//         main?: string;
//         light?: string;
//         dark?: string;
//         contrastText?: string;
//     }
//     interface SidebarTextColor {
//         primary?: string;
//         active?: string;
//     }
//     interface SidebarPalette {
//         background?: SidebarColor;
//         active?: SidebarColor;
//         text?: SidebarTextColor;
//     }
//     interface Palette {
//         sidebar?: SidebarPalette;
//     }
//     interface PaletteOptions {
//         sidebar?: SidebarPalette;
//     }
// }

export default theme;
