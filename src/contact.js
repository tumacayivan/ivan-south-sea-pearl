export const CONTACT_EMAIL = 'tumacayivan@gmail.com';

export function contactMailto(
  subject = 'Golden South Sea Pearl'
) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
