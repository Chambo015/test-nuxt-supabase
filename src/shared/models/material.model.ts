export interface CourseMaterial {
  id: number
  name: string
  file: string
  course_id: number
  type: {
    id: number
    name: string
  }
}
