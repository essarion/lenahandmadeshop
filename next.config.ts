import type { NextConfig } from 'next';
import type { Configuration, RuleSetRule } from 'webpack';
import withBundleAnalyzer from '@next/bundle-analyzer';

function isRegExpRule(rule: unknown): rule is RuleSetRule & { test: RegExp } {
  return typeof rule === 'object' && rule !== null && 'test' in rule && rule['test'] instanceof RegExp;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['red-bud.ru'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*'],
    },
    optimizePackageImports: ['lodash', 'date-fns'],
  },
  webpack(config: Configuration, { dev }) {
    if (!Array.isArray(config.module?.rules)) return config;

    // 🧼 Удаляем базовую обработку .svg
    config.module.rules = config.module.rules.filter(rule => {
      if (isRegExpRule(rule)) {
        return !rule.test.test('.svg');
      }
      return true;
    });

    // ✅ SVG как React-компонент при импорте с ?component
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /component/,
      use: ['@svgr/webpack'],
    });

    // ✅ SVG как файл при обычном импорте
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset/resource',
      resourceQuery: { not: [/component/] },
    });

    // ✅ Картинки
    config.module.rules.push({
      test: /\.(avif|webp|jpe?g|png)$/i,
      type: 'asset/resource',
    });

    // ✅ Оптимизации только для production
    if (!dev) {
      config.resolve = {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias ?? {}),
          'next/dist/compiled/next-devtools': false,
        },
      };

      config.optimization = {
        ...config.optimization,
        minimize: true,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: -10,
              reuseExistingChunk: true,
              filename: 'static/chunks/vendors.[contenthash].js',
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
              filename: 'static/chunks/commons.[contenthash].js',
            },
          },
        },
      };
    }

    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
