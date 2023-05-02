import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from '../../styles/style';

export const Language = {
  KHMER: 'kh',
  ENGLISH: 'en',
};

export const FormatLang: any = {
  kh: style.battambangBold,
  en: style.battambangBold,
};

export const FormatLangMedium: any = {
  kh: style.battambang,
  en: style.battambang,
};

export const FormatLangBold: any = {
  kh: style.battambangBold,
  en: style.battambangBold,
};

export const en = require('../../res/lang/en.json');
export const kh = require('../../res/lang/kh.json');

export default async function lang(language = null) {
  const lang =
    language === null ? await AsyncStorage.getItem('@lang') : language;
  if (lang === null || lang === 'en') return en;
  else return kh;
}
