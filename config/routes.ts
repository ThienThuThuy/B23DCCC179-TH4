export default [
  // MENU
  {
    path: '/',
  },
  {
    name: 'Quản lý sổ văn bằng tốt nghiệp',
    icon: 'HomeOutlined',
    path: '/sovanbang',
    routes: [
      {
        name: 'Quản lí sổ văn bằng',
        path: '/sovanbang/quanlisovanbang',
        component: './SoVanBang/QuanLiSoVanBang',
        exact: true,
      },
      {
        name: 'Cấu hình biểu mẫu',
        path: '/sovanbang/cauhinhbieumau',
        component: './SoVanBang/CauHinhBieuMau',
        exact: true,
      },
      {
        name: 'Quản lí văn bằng',
        path: '/sovanbang/quanlivanbang',
        component: './SoVanBang/VanBang',
        exact: true,
      },
      {
        name: 'Quyết định tốt nghiệp',
        path: '/sovanbang/quyetdinhtotnghiep',
        component: './SoVanBang/QuyetDinhTotNgiep',
        exact: true,
      },
      {
        name: 'Tra Cứu',
        path: '/sovanbang/tracuu',
        component: './SoVanBang/TraCuu',
        exact: true,
      },
    ],
  },
];
