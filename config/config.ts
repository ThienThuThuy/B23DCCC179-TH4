// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

import routes from './routes';
// import proxy from './proxy';
// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  model: {}, // Bật để dùng model
  initialState: {},
  layout: {
    ...defaultSettings, // Tiêu đề hiển thị
  },
  proxy: {
    '/api': {
      target: 'http://localhost:5000', // Địa chỉ backend
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Xóa prefix '/api' nếu cần
    },
  },
  routes,
  npmClient: 'yarn', // Cấu hình npmClient
});

