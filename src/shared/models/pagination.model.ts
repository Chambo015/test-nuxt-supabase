import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Pagination {
  constructor(
    public page: number,
    public from?: number,
    public last_page?: number,
    public per_page?: number,
    public total?: number,
  ) {}

  static fromJson: JsonParser<Pagination> = (json: any) => {
    return new Pagination(
      Parse.number(json.current_page),
      Parse.number(json.from),
      Parse.number(json.last_page),
      Parse.number(json.per_page),
      Parse.number(json.total),
    );
  };
}
