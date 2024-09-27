import type { Journal, JournalDetail } from "./journal.type";

export interface Course {
  id: number
  is_free: boolean
  price: number
  name: string
  note: string
  name_1: string | null
  name_2: string | null
  name_3: string | null
  name_4: string | null
  note_1: string | null
  note_2: string | null
  note_3: string | null
  note_4: string | null
  poster: string
  is_purchased: boolean
  is_started: boolean
  journal: Journal | null
  current_journal_detail: JournalDetail | null
}
