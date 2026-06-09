"use client";
import { createTheme } from '@mui/material/styles';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa', // Blue 400
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    secondary: {
      main: '#a78bfa', // Purple 400
      light: '#c4b5fd',
      dark: '#8b5cf6',
    },
    background: {
      default: '#030712', // Gray 950
      paper: 'rgba(17, 24, 39, 0.7)', // Gray 900 with transparency
    },
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
    },
    info: {
      main: '#38bdf8',
    },
    success: {
      main: '#4ade80',
    },
    warning: {
      main: '#fbbf24',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(at 0% 0%, #0f172a 0px, transparent 50%), radial-gradient(at 100% 0%, #1e1b4b 0px, transparent 50%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backgroundImage: 'none', // Remove default MUI paper overlay
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(96, 165, 250, 0.4)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  },
});
