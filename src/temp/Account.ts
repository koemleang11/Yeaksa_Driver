import { AppImages } from './../theme/images';
import { Routes } from "./Routes";

export const accountList = [
    {
        id: 1,
        title: 'my_profile',
        route: Routes.MyProfile,
        icon: AppImages.MyProfile
    },
    {
        id: 2,
        title: 'products',
        route: Routes.MainProduct,
        icon: AppImages.Product
    },
    {
        id: 3,
        title: 'vouchers',
        route: Routes.Vouchers,
        icon: AppImages.Vouchers
    },
    {
        id: 4,
        title: 'chat_support',
        route: Routes.ChatSupport,
        icon: AppImages.Chat
    },
    {
        id: 5,
        title: 'change_password',
        route: Routes.ChangePassword,
        icon: AppImages.ChangePassword
    },
    {
        id: 6,
        title: 'about_us',
        route: Routes.AboutUs,
        icon: AppImages.AboutUs
    },
    {
        id: 7,
        title: 'contact_us',
        route: Routes.ContactUs,
        icon: AppImages.ContactUs
    },
    {
        id: 8,
        title: 'term_of_use',
        route: Routes.TermOfUse,
        icon: AppImages.TermOfUse
    },
    {
        id: 9,
        title: 'privacy_policy',
        route: Routes.PrivacyPolicy,
        icon: AppImages.PrivacyPolicy
    },
    {
        id: 10,
        title: 'settings',
        route: Routes.Settings,
        icon: AppImages.Setting
    },
    {
        id: 11,
        title: 'logout',
        route: null,
        icon: AppImages.Logout
    },
]