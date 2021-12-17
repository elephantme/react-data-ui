import { defineConfig } from 'dumi';

// 此处更换为自己的仓库名
let base = '/react-data-ui';
let publicPath = '/react-data-ui/';

if (process.env.SITE_BUILD_ENV === 'PREVIEW') {
  base = undefined;
  publicPath = undefined;
}

export default defineConfig({
  title: '大数据组件库',
  mode: 'site',
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  outputPath: 'doc-site',
  exportStatic: {},
  dynamicImport: {},
  webpack5: {},
  mfsu: {},
  base,
  publicPath,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
