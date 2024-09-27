import { Parse } from "~/shared/parse";
import type { Content } from "~/types/content.type";

// const delay = () => {
//   return new Promise(resolve => setTimeout(resolve, 500000));
// };

export function useFeedById() {
  const { $module } = useNuxtApp();
  const route = useRoute();
  const idFeed = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  return $module.content.contentById(Parse.number(idFeed));
}
