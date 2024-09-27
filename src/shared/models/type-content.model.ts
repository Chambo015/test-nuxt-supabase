import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class ContentType {
  constructor(
    public id: number,
    public color: string,
    public name: string,
  ) {}

  static fromJson: JsonParser<ContentType> = (json: any) => {
    return new ContentType(
      Parse.number(json.id),
      Parse.string(json.color),
      Parse.string(json.name),
    );
  };
}
