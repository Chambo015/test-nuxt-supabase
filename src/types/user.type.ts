import type { AdvancedJournal } from "./journal.type";

export interface User {
  id: string
  name: string
  last_name: string | null // Обязательная для полной регистрации юзера
  login: string | null
  email: string
  photo: string | null
  job_direction_id: string | null // Обязательная для полной регистрации юзера
  job_position_id: string | null // Обязательная для полной регистрации юзера
  hobby_direction_id: string | null // Обязательная для полной регистрации юзера
  is_verified: boolean // Прошел ли основную регистрацию
  is_registration_complete: boolean // Введена ли дополнительная информация, после которой изменить невозможно
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
