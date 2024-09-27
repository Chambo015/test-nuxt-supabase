import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";

export class Test {
  constructor(
    public question_id: number,
    public question: string,
    public type: number,
    public options?: TestOptions[],
  ) {}

  static fromJson: JsonParser<Test> = (json: any) => {
    return new Test(
      Parse.number(json.question_id),
      Parse.string(json.question),
      Parse.number(json.type),
      Parse.list(json.options, TestOptions.fromJson),
    );
  };
}

export class TestOptions {
  constructor(
    public id: number,
    public option: string,
  ) {}

  static fromJson: JsonParser<TestOptions> = (json: any) => {
    return new TestOptions(Parse.number(json.id), Parse.string(json.option));
  };
}
