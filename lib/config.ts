/**
 * Configuration utility for app URLs and redirects
 * This marketing site redirects to the SaaS app for all auth and app functionality
 */

// Get the SaaS app URL from environment variables
export const getAppUrl = () => {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

// Redirect paths for the SaaS app
export const appRoutes = {
  signup: `${getAppUrl()}/signup`,
  signin: `${getAppUrl()}/signin`,
  dashboard: `${getAppUrl()}/dashboard`,
  demo: getAppUrl(), // Live demo is at the root of app.exbabel.com
  contact: `${getAppUrl()}/contact`,

  // Pricing redirects - route to checkout with plan parameter
  pricingStarter: `${getAppUrl()}/translate/checkout?plan=starter`,
  pricingPro: `${getAppUrl()}/translate/checkout?plan=pro`,
  pricingUnlimited: `${getAppUrl()}/translate/checkout?plan=unlimited`,
  pricingCustom: `${getAppUrl()}/contact?type=enterprise`,

  // Live product pricing redirects
  pricingLive: `${getAppUrl()}/live/checkout`,
  pricingLiveAnnual: `${getAppUrl()}/live/checkout?billing=yearly`,
};

// Helper function for external navigation
export const navigateToApp = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

