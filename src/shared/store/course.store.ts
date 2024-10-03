import type { CourseMaterial } from "../models/material.model";

interface CourseStateType {
  material: CourseMaterial[]
}

export const useCourseStore = defineStore("course", {
  state: (): CourseStateType => ({
    material: [],
  }),
  getters: {},
  actions: {
    setMaterial(payload: CourseMaterial[]) {
      this.material = payload;
    },
  },
});
