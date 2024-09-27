import type { AdvancedJournal } from "./journal.type";

export interface User {
  id: string
  name: string
  last_name: string | null
  login: string | null
  email: string
  photo: string | null
  job_direction_id: string | null
  job_position_id: string | null
  hobby_direction_id: string | null
  is_verified: boolean
  is_registration_complete: boolean
  journals?: AdvancedJournal[]
  created_at: string
  updated_at: string
};

export interface UserDirection {
  name: string
  id: number
};
