export interface Lesson {
  id: string
  name: string
  photo: string
  course_id: number
  module_id: number
};

export interface PublicLesson {
  id: string
  lesson_id: string
  link: string
};
