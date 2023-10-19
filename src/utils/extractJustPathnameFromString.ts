/**
 * Extracts just the pathname from the string by removing
 * hashes and query params
 * @param to The path to extract from
 */
export default function extractJustPathnameFromString(to: any) {
  // If it has a to path, assume that it's a string, attempt to extract only
  // the pathname
  if (typeof to === 'string') {
    try {
      to = new URL(`http://test${to}`).pathname;
    } catch (e) {}
  }
  return to;
}
