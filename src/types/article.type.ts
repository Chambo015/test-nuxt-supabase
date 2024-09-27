import type { ContentType } from "./content.type";

export interface Article {
  id: number
  name: string
  note: string
  youtube_link: string | null
  video: string | null
  photo: string
  kinescope: string | null
  tags: ContentType[]
}
