import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";
import { ContentType } from "~/shared/models/type-content.model";
import { User } from "~/shared/models/user.model";

export class Content {
  constructor(
    public id: number,
    public name: string,
    public note: string,
    public short_note: string,
    public youtube: string,
    public poster: string,
    public video: string,
    public is_pro: boolean,
    public user?: User,
    public date?: string,
    public type?: ContentType,
    public tags?: ContentType[],
    public themes?: ContentType[],
  ) {}

  static fromJson: JsonParser<Content> = (json: any) => {
    return new Content(
      Parse.number(json.id),
      Parse.string(json.name),
      Parse.string(json.note),
      Parse.string(json.short_note),
      Parse.string(json.youtube),
      Parse.string(json.poster),
      Parse.string(json.video),
      Parse.boolean(json.is_pro),
      Parse.object(json.created_user, User.fromJson),
      Parse.date(json.created_at),
      Parse.object(json.type, ContentType.fromJson),
      Parse.list(json.tags, ContentType.fromJson),
      Parse.list(json.themes, ContentType.fromJson),
    );
  };
}
