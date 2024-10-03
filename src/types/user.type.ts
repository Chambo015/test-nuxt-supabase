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

export interface ReferralGroup {
  course_id: number
  course_name: string
  total: number
  finished: number
}

export interface ReferralGroupUser {
  user_id: number
  name: string | null
  email: string
  last_name: string | null
  is_done: boolean
}
