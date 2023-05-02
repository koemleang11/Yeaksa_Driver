import { useAppSelector } from './../../hooks/dispatch';
var moment = require('moment/min/moment-with-locales')

export const NormalDate = (date: any) => {
  const lang: any = useAppSelector(state => state.lang);
  return lang.lang == 'en' ? moment(date).locale('en').format('DD MMM YYYY') :
    moment(date).locale('km').format('DD MMM YYYY')
}

export default NormalDate;