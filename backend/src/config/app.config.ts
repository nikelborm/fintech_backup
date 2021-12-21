export const appConfig = () => ({
  isDevelopment: process.env.PROJECT_ENV_TYPE === 'development',
  isProduction: process.env.PROJECT_ENV_TYPE === 'production',
  serverPort: parseInt(process.env.SERVER_PORT || '3000', 10),
  currencyLayerAccessKey: process.env.CURRENCY_LAYER_ACCESS_KEY || '',
  stripeKey: process.env.STRIPE_KEY || '',
  paymentsRedirectUrl:
    process.env.PAYMENTS_REDIRECT_DOMAIN || 'http://127.0.0.1',
});
