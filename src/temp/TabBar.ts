import {AppImages} from '../theme/images';
import {Routes} from './Routes';

export const tabBarItem = [
  {
    id: 0,
    name: 'Assigned',
    icon: AppImages.Assigned,
    route: Routes.Login,
  },
  {
    id: 1,
    name: 'My Jobs',
    icon: AppImages.Work,
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
    name: 'History',
    icon: AppImages.Order,
    route: Routes.Order,
  },
  {
    id: 4,
    name: 'Account',
    icon: AppImages.Account,
    route: Routes.Account,
  },
];
