/**
 * Configuration utility for app URLs and redirects
 * This marketing site redirects to the SaaS app for all auth and app functionality
 */

// Get the SaaS app URL from environment variables
export const getAppUrl = () => {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://app.exbabel.com';
};

// Redirect paths for the SaaS app
export const appRoutes = {
  signup: `${getAppUrl()}/signup`,
  signin: `${getAppUrl()}/signin`,
  dashboard: `${getAppUrl()}/dashboard`,
  demo: getAppUrl(), // Live demo is at the root of app.exbabel.com
  contact: `${getAppUrl()}/contact`,
  
  // Pricing redirects - can include plan parameter
  pricingStarter: `${getAppUrl()}/signup?plan=starter`,
  pricingPro: `${getAppUrl()}/signup?plan=pro`,
  pricingUnlimited: `${getAppUrl()}/signup?plan=unlimited`,
  pricingCustom: `${getAppUrl()}/contact?type=enterprise`,
};

// Helper function for external navigation
export const navigateToApp = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

