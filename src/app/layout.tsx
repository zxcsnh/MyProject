import "./globals.css";
import theme from "@/theme/theme"
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
