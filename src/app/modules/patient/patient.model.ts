import type { Profile } from '@app/modules/profile';

export interface Patient {
  id: string;
  created_at: string;
  photoId: string;
  name: string;
  birthdate: string;
  mothers_name: string;
  gender: string;
  profile: Profile;
}
