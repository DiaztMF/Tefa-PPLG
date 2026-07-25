/**
 * Helper to get project preview image URL:
 * 1. Returns custom imageUrl if provided by admin.
 * 2. If liveUrl exists, returns automatic live screenshot API URL (Microlink API).
 * 3. Returns null (triggers fallback gradient mockup frame).
 */
export function getProjectPreviewImage(
  imageUrl?: string,
  liveUrl?: string
): string | null {
  if (imageUrl && imageUrl.trim().length > 0) {
    return imageUrl;
  }
  if (liveUrl && (liveUrl.startsWith("http://") || liveUrl.startsWith("https://"))) {
    // Dynamic website screenshot generator
    return `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&embed=screenshot.url`;
  }
  return null;
}
