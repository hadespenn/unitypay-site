/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // React Compiler reduces hydration-time reflows by memoizing components
  experimental: {
    reactCompiler: true,
  },
};
