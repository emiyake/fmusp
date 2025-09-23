export interface Patient {
  id: string;
  name: string;
  birthdate: string;
  mothers_name: string;
  gender: string;
  profile: {
    user_id: string;
    first_name: string;
    last_name: string;
    created_at: string;
  };
}
