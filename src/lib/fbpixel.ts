export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1789341548442036";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

export const fbq = (...args: any[]) => {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;
  window.fbq(...args);
};