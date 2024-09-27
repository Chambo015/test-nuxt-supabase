export interface RegisterDto {
  name: string
  last_name: string
  login: string
  email: string
  password?: string
  re_password?: string
  // job_direction_id: number
  // job_position_id: number
  // hobby_direction_id: number
}

export interface EditProfileDto {
  name: string
  last_name: string
  login: string
  email: string
  job_direction_id?: number
  job_position_id?: number
  hobby_direction_id?: number
}

export interface LoginDto {
  email: string
  password: string
}

export interface ResetPasswordDto {
  old_password: string
  password: string
  re_password: string
}

export interface ResetPasswordWithTokenDTO {
  email_or_login: string
  password: string
  re_password: string
  token: string
}

export interface SocialAuth {
  social_provider: "google" | "facebook"
  access_token: string
}
