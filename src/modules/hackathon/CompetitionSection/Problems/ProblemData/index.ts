import { PROBLEM_DISTINCT_QUERY_MARKDOWN } from "./3_25_DistinctQuery";
import { PROBLEM_STRING_SIMILARITY_MARKDOWN } from "./1_27_StringSimilarity";
import { PROBLEM_FAVORITE_NUMBERS_MARKDOWN } from "./2_28_FavoriteNumbers";

export const PROBLEM_DATASOURCE = [
  {
    id: '27',
    content: PROBLEM_STRING_SIMILARITY_MARKDOWN,
  },
  {
    id: '28',
    content: PROBLEM_FAVORITE_NUMBERS_MARKDOWN,
  },
  {
    id: '25',
    content: PROBLEM_DISTINCT_QUERY_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
