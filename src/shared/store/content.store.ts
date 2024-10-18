import { Parse } from "../parse";
import type { Short } from "~/shared/models/short.model";
import type { Banner } from "~/shared/models/banner.model";
import type { ContentType } from "~/shared/models/type-content.model";

import { type Pagination, usePagination } from "~/shared/composables/usePagination";
import type { ResponseMeta } from "~/types/response.type";
import type { Content } from "~/types/content.type";

interface AuthStateType {
  banners: Banner[]
  contents: Content[]
  pagination: {
    page: number
    hasMore: boolean
  }
  currentContent?: Content
}

export const useContentStore = defineStore("content", {
  state: (): AuthStateType => ({
    banners: [],
    contents: [],
    pagination: {
      page: 1,
      hasMore: false,
    },
    currentContent: undefined,
  }),
  actions: {
    setBanners(payload: Banner[]) {
      this.banners = payload;
    },
    setContent(payload: Content[]) {
      this.contents.push(...payload);
    },
    setCurrentContent(payload: Content) {
      this.currentContent = payload;
    },
    setContentPagination(payload: ResponseMeta) {
      const currentPage = Parse.number(payload.current_page) || 1;
      if (currentPage === 1) {
        this.resetContents();
      } else {
        this.pagination.page = currentPage;
      }
    },
    resetContents() {
      this.contents = [];
      this.pagination.page = 1;
    },
  },
});
