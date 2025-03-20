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
  routes,
  npmClient: 'yarn', // Cấu hình npmClient
});
