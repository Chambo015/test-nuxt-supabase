import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Lesson {
  constructor(
    public id: string,
    public name: string,
    public photo: string,
    public course_id: number,
    public module_id: number,
  ) {}

  static fromJson: JsonParser<Lesson> = (json: any) => {
    return new Lesson(
      Parse.string(json.id),
      Parse.string(json.name),
      Parse.string(json.photo),
      Parse.number(json.course_id),
      Parse.number(json.module_id),
    );
  };
}
