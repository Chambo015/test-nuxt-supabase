import { thousandSeparator } from "~/shared/utils";
import type { Course } from "~/types/course.type";

export class AdapterCourse {
  constructor(private target: Course) {}

  protected get adaptedPrice() {
    return thousandSeparator(this.target.price);
  }

  adapt() {
    const adaptee = {
      ...this.target,
      adaptedPrice: this.adaptedPrice,
    };

    return adaptee;
  }
};

export type AdapterCourseReturnType = ReturnType<AdapterCourse["adapt"]>;
