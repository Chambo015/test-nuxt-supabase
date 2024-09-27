import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Module {
  constructor(
    public id: number,
    public name: string,
    public photo: string,
    public note: string,
  ) {}

  static fromJson: JsonParser<Module> = (json: any) => {
    return new Module(
      Parse.number(json.id),
      Parse.string(json.name),
      Parse.string(json.photo),
      Parse.string(json.note),
    );
  };
}
