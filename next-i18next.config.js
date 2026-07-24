/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
  defaultNS: 'common',
  ns: ['common', 'legal'],
  localePath: './public/locales',
};