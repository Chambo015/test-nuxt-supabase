import { type Short, ShortType } from "~/types/content.type";

export class AdapterShortHistories {
  constructor(
    private target: Short,
  ) {}

  get thumbnail() {
    return this.target.thumbnail || this.target.file;
  }

  get typeFile(): ShortType {
    if (this.target.file.endsWith("mp4") || this.target.file.endsWith("mov")) {
      return ShortType.VIDEO;
    } else {
      return ShortType.IMAGE;
    }
  }

  adapt() {
    return {
      ...this.target,
      thumbnail: this.thumbnail,
      typeFile: this.typeFile,
    };
  }
}

export type AdapterShortHistoriesReturnType = ReturnType<AdapterShortHistories["adapt"]>;
