import type { Profile } from '@app/modules/profile';
import type { Patient } from './patient.model';

export interface PatientHistory {
  id: string;
  form_id: string;
  form_title: string;
  form_structure: Record<string, any>;
  form_data: Record<string, any>;
  form_is_consultation: boolean;
  created_at: string;
  profile: Profile;
  patient: Patient;
}
