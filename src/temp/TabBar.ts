import {AppImages} from '../theme/images';
import {Routes} from './Routes';

export const tabBarItem = [
  {
    id: 0,
    name: 'add_product',
    icon: AppImages.Account,
    route: Routes.Dashboard,
  },
  {
    id: 1,
    name: 'chat',
    icon: AppImages.Chat,
    route: Routes.Chat,
  },
  {
    id: 2,
    name: 'dashboard',
    icon: AppImages.Dashboard,
    route: Routes.Dashboard,
  },

  {
    id: 3,
    name: 'orders',
    icon: AppImages.Order,
    route: Routes.Order,
  },
  {
    id: 4,
    name: 'account',
    icon: AppImages.Account,
    route: Routes.Account,
  },
];
