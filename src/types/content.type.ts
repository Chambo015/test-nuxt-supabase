import type { User } from "./user.type.ts";

export interface Content {
  id: number
  is_pro: boolean
  pin_to_top: boolean
  name: string
  note: string
  short_note: string
  youtube_link: string
  poster: string
  video: string | null
  type?: ContentType
  cyber_module: { sys_name: string, id: number } | null
  tags?: ContentType[]
  themes?: ContentType[]
  created_user?: User
  created_at?: string
  updated_at?: string
}

export interface ContentType {
  id: number
  color: string
  name: string
};

export interface Banner {
  file: string
  link: string
}

export interface Short {
  id: number
  file: string
  name: string
  note: string
  link: string
  thumbnail: string
}

export enum ShortType {
  VIDEO = 0,
  IMAGE = 1,
}
