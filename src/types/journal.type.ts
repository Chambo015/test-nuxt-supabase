import type { Article } from "./article.type";
import type { Course } from "./course.type";
import type { Module } from "./module.type";

export interface Journal {
  id: number
  certificate_en: string
  certificate_kz: string
  certificate_ru: string
  course_id: number
  is_done: boolean
  user_id: number
}

export interface AdvancedJournal extends Journal {
  course: Course
};

export interface JournalDetail {
  id: number
  article_test_id: number | null
  module_test_id: number | null
  is_done_article_test: boolean
  is_done_module_test: boolean
  is_started: boolean
  is_done: boolean
  can_go_next: boolean
  journal?: Journal
  course?: Pick<Course, "id" | "name" | "note" | "poster" >
  module?: Module
  article?: Article
}
