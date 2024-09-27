import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Course {
  constructor(
    public id: number,
    public name: string,
    public note: string,
    public poster: string,
  ) {}

  static fromJson: JsonParser<Course> = (json: any) => {
    return new Course(
      Parse.number(json.file),
      Parse.string(json.name),
      Parse.string(json.note),
      Parse.string(json.poster),
    );
  };
}
