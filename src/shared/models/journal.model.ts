import type { JsonParser } from "@/types";
import { Parse } from "~/shared/parse";
import { Course } from "~/shared/models/course.model";
import type { Course as ICourse } from "~/types/course.type";
import { Module } from "~/shared/models/module.model";
import { Article } from "~/shared/models/article.model";

export class Journal {
  constructor(
    public id: number,
    public certificate_en: string,
    public certificate_kz: string,
    public certificate_ru: string,
    public course_id: number,
    public is_done: boolean,
    public user_id: number,
  ) {}

  static fromJson: JsonParser<Journal> = (json: any) => {
    return new Journal(
      Parse.number(json.id),
      Parse.string(json.certificate_en),
      Parse.string(json.certificate_kz),
      Parse.string(json.certificate_ru),
      Parse.number(json.course_id),
      Parse.boolean(json.is_done),
      Parse.number(json.user_id),
    );
  };
}

export class AdvancedJournal extends Journal {
  constructor(
    public id: number,
    public certificate_en: string,
    public certificate_kz: string,
    public certificate_ru: string,
    public course_id: number,
    public is_done: boolean,
    public user_id: number,
    public course: ICourse,
  ) {
    super(id, certificate_en, certificate_kz, certificate_ru, course_id, is_done, user_id);
    this.course = course;
  }

  static fromJson: JsonParser<AdvancedJournal> = (json: any) => {
    return new AdvancedJournal(
      Parse.number(json.id),
      Parse.string(json.certificate_en),
      Parse.string(json.certificate_kz),
      Parse.string(json.certificate_ru),
      Parse.number(json.course_id),
      Parse.boolean(json.is_done),
      Parse.number(json.user_id),
      json.course,
    );
  };
}

export class JournalDetail {
  constructor(
    public id: number,
    public article_test_id: number,
    public module_test_id: number,
    public is_done_article_test: boolean,
    public is_done_module_test: boolean,
    public is_started: boolean,
    public is_done: boolean,
    public can_go_next: boolean,
    public journal?: Journal,
    public course?: Course,
    public module?: Module,
    public article?: Article,
  ) {}

  static fromJson: JsonParser<JournalDetail> = (json: any) => {
    return new JournalDetail(
      Parse.number(json.id),
      Parse.number(json.article_test_id),
      Parse.number(json.module_test_id),
      Parse.boolean(json.is_done_article_test),
      Parse.boolean(json.is_done_module_test),
      Parse.boolean(json.is_started),
      Parse.boolean(json.is_done),
      Parse.boolean(json.can_go_next),
      Parse.object(json.journal, Journal.fromJson),
      Parse.object(json.course, Course.fromJson),
      Parse.object(json.module, Module.fromJson),
      Parse.object(json.article, Article.fromJson),
    );
  };
}
