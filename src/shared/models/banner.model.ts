import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Banner {
  constructor(
    public file: string,
    public link: string,
  ) {}

  static fromJson: JsonParser<Banner> = (json: any) => {
    return new Banner(Parse.string(json.file), Parse.string(json.link));
  };
}
