import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // // 使用反向代理解决跨域问题
  // async rewrites() {
  //   return [
  //     {
  //       // 1. 客户端请求的路径 (source)
  //       // 例如：/api/ddg/search?q=test
  //       source: '/api/ddg:path*', 
        
  //       // 2. 实际代理的目标路径 (destination)
  //       // 注意：这里是绝对路径，你需要替换成你要代理的API地址
  //       // :path* 会将 /api/ddg/ 之后的所有路径片段附加到目标地址
  //       destination: 'https://duckduckgo.com/ac:path*', 
  //     },
  //   ];
  // },
};

export default nextConfig;
