
const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue'),
  },
  {
    path: '/rfid',
    component: () => import('pages/RFID.vue'),
  },
  {
    path: '/users',
    component: () => import('pages/Users.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
