import { useFetchApi } from "~/shared/composables/useHttp";
import { HttpMethod } from "~/shared/enums/http.enum";
import { Banner } from "~/shared/models/banner.model";
import { Content } from "~/shared/models/content.model";
import { Short } from "~/shared/models/short.model";
import { ContentType } from "~/shared/models/type-content.model";
import { Parse } from "~/shared/parse";
import { useContentStore } from "~/shared/store/content.store";

export class ContentRepository {
  // static async content() {
  //   const contentStore = useContentStore();
  //   const route = useRoute();

  //   if (contentStore.pagination?.current_page === 1) {
  //     contentStore.contents = [];
  //   }

  //   const data = await useFetchApi({
  //     url: "content/content",
  //     headers: {
  //       method: HttpMethod.GET,
  //       params: {
  //         ...contentStore.pagination,
  //       },
  //       query: route.query,
  //     },
  //   });

  //   // contentStore.setContentPagination(Parse.object(data.meta, Pagination.fromJson) as Pagination);
  //   contentStore.setContent(Parse.list(data.data, Content.fromJson));
  // }

  static async short() {
    const contentStore = useContentStore();
    const data = await useFetchApi({
      url: "content/shorts",
      headers: {
        method: HttpMethod.GET,
      },
    });

    contentStore.setShorts(Parse.list(data.data, Short.fromJson));
  }

  static async banner() {
    const contentStore = useContentStore();
    const data = await useFetchApi({
      url: "content/banner",
      headers: {
        method: HttpMethod.GET,
      },
    });

    contentStore.setBanners(Parse.list(data.data, Banner.fromJson));
  }
}
