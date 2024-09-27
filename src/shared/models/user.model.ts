import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";
import { AdvancedJournal } from "~/shared/models/journal.model";
import { TestOptions } from "~/shared/models/test.model";

export class User {
  constructor(
    public email: string,
    public login: string,
    public name: string,
    public last_name: string,
    public photo: string,
    public is_verified: boolean,
    public is_registration_complete: boolean,
    public is_ib: boolean,
    public journals?: AdvancedJournal[],
    public ib?: UserIB,
  ) {}

  static fromJson: JsonParser<User> = (json: any) => {
    return new User(
      Parse.string(json.email),
      Parse.string(json.login),
      Parse.string(json.name),
      Parse.string(json.last_name),
      Parse.string(json.photo),
      Parse.boolean(json.is_verified),
      Parse.boolean(json.is_registration_complete),
      Parse.boolean(json.is_ib),
      Parse.list(json.journals, AdvancedJournal.fromJson),
      Parse.object(json.ib, UserIB.fromJson),
    );
  };
}

class UserIB {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}

  static fromJson: JsonParser<UserIB> = (json: any) => {
    return new UserIB(
      Parse.number(json.id),
      Parse.string(json.name),
      Parse.string(json.email),
    );
  };
};
