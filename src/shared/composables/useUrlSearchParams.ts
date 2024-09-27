import { Parse } from "../parse";

interface Options {
  onChange: () => void
}

export function useUrlSearchParams(options?: Options) {
  const { onChange } = options || {};

  const route = useRoute();
  const router = useRouter();

  const state = reactive<Record<string, any>>({
    ...route.query,
  });

  watch(state, (newState) => {
    const { params, query, hash } = route;

    if (onChange) onChange();

    router.replace({
      params,
      query: { ...query, ...newState },
      hash,
    });
  });

  /**
   * Дополнительная проверка если route.query будет изменен без state
   */
  watch(() => route.query, (newQuery) => {
    const differenceQuery = Object.keys(state)
      .filter(q => !(Parse.string(newQuery[q]) === Parse.string(state[q])));

    if (differenceQuery.length <= 0) return;

    differenceQuery.forEach((q) => {
      if (newQuery[q]) {
        state[q] = newQuery[q];
      } else {
        delete state[q];
      }
    });
  }, { immediate: false });

  return state;
}
