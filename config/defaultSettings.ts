import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  borderRadiusBase: string;
  siderWidth: number;
} = {
  navTheme: 'light',
  borderRadiusBase: '2px',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'GTool',
  pwa: false,
  logo: '',
  iconfontUrl: '',
  siderWidth: 220,
};

export default Settings;