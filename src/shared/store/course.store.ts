import type { CourseMaterial } from "../models/material.model";
import type { Module } from "~/shared/models/module.model";
import type { Lesson } from "~/shared/models/lesson.model";
import { CourseRepository } from "~/shared/repository/course.repository";

type CourseStateType = {
  module: Module[];
  lesson: Lesson[];
  currentModule?: Module;
  currentLesson?: Lesson;
  moduleLoader: boolean;
  lessonLoader: boolean;
  material: CourseMaterial[]
};

export const useCourseStore = defineStore("course", {
  state: (): CourseStateType => ({
    module: [],
    lesson: [],
    currentModule: undefined,
    currentLesson: undefined,
    moduleLoader: false,
    lessonLoader: false,
    material: []
  }),
  getters: {},
  actions: {
    setModule(payload: Module[]) {
      this.moduleLoader = true;
      this.module = payload;

      if (!this.currentModule) {
        this.currentModule = payload[0];
        CourseRepository.getLesson(+payload[0].id);
      }

      this.moduleLoader = false;
    },
    setCurrentModule(payload: Module) {
      this.lessonLoader = true;

      useCourseStore().lesson = [];
      this.currentModule = payload;
      CourseRepository.getLesson(+payload.id);
    },
    setLesson(payload: Lesson[]) {
      this.lesson = payload;
      this.lessonLoader = false;
    },
    setCurrentLesson(payload: Lesson) {
      this.currentLesson = payload;
    },
    setMaterial(payload: CourseMaterial[]) {
      this.material = payload;
    },
  },
});
