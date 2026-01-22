import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; // 根据你安装的包名调整版本
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/theme/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 1. 必须包裹 AppRouterCacheProvider */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/* 2. 建议加上 CssBaseline 来统一基础样式 */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}