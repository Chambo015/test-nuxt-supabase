import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Short {
  constructor(
    public file: string,
    public name: string,
    public note: string,
    public link: string,
  ) {}

  static fromJson: JsonParser<Short> = (json: any) => {
    return new Short(
      Parse.string(json.file),
      Parse.string(json.name),
      Parse.string(json.note),
      Parse.string(json.link),
    );
  };
}
