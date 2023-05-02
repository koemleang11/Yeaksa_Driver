import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Platform} from 'react-native';
import {encryptData} from '../crypto';
export const share_url =
  Platform.OS === 'ios'
    ? 'https://yeaksanews.page.link'
    : 'https://yeaksanews.page.link';

export async function buildShortLink(item: any) {
  const social = {
    title: item.title?.km,
    imageUrl: item.thumbnail_url,
  };
  const id = await encryptData({id: item.id});
  const link = await dynamicLinks().buildShortLink({
    link: `${share_url}/detail/` + id,
    domainUriPrefix: share_url,
    analytics: {
      campaign: 'banner',
    },
    social,
    android: {
      packageName: 'com.yeaksa_news',
    },
    ios: {
      bundleId: 'org.phsartech.yeaksa-news',
      // appStoreId: '6446475938',
    },
  });
  return link;
}
