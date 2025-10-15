import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || 'en';
  const messages = (await import(`../../content/translations/${validLocale}.json`)).default;
  
  return {
    locale: validLocale,
    messages
  };
});
