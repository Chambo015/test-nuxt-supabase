import { ContentType } from "./type-content.model";
import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Article {
  constructor(
    public id: number,
    public name: string,
    public note: string,
    public youtube_link: string,
    public video: string,
    public photo: string,
    public kinescope: string,
    public tags: ContentType[],
  ) {}

  static fromJson: JsonParser<Article> = (json: any) => {
    return new Article(
      Parse.number(json.id),
      Parse.string(json.name),
      Parse.string(json.note),
      Parse.string(json.youtube_link),
      Parse.string(json.video),
      Parse.string(json.photo),
      Parse.string(json.kinescope),
      Parse.list(json.tags, ContentType.fromJson),
    );
  };
}
