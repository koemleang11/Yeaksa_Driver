var moment = require('moment/min/moment-with-locales')

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})