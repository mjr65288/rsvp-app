export type RsvpInput = {
  guestName: string;
  attendance: 'yes' | 'no';
  adults: number;
  children: number;
  dietaryNeeds: string;
};

export type RsvpResult =
  | { ok: true; message: string; editUrl?: string }
  | { ok: false; message: string };

export function validateRsvp(formData: FormData): RsvpInput | string {
  const guestName = String(formData.get('guestName') ?? '').trim();
  const attendance = String(formData.get('attendance') ?? '');
  const adults = Number(formData.get('adults') ?? 0);
  const children = Number(formData.get('children') ?? 0);
  const dietaryNeeds = String(formData.get('dietaryNeeds') ?? '').trim();
  if (guestName.length < 2 || guestName.length > 100) return 'Enter a name between 2 and 100 characters.';
  if (attendance !== 'yes' && attendance !== 'no') return 'Choose whether you can attend.';
  if (!Number.isInteger(adults) || adults < 0 || adults > 20) return 'Choose a valid adult count.';
  if (!Number.isInteger(children) || children < 0 || children > 20) return 'Choose a valid child count.';
  if (attendance === 'yes' && adults + children < 1) return 'At least one guest is required when attending.';
  if (dietaryNeeds.length > 500) return 'Dietary notes must be 500 characters or fewer.';
  return { guestName, attendance, adults, children, dietaryNeeds };
}
