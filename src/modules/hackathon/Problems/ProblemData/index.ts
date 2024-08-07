import { PROBLEM_GCD_MARKDOWN } from './problem_gcd';
import { PROBLEM_ARRAY_SORT_MARKDOWN } from './problem_array-sort';
import { PROBLEM_LIBRARY_MARKDOWN } from './problem_library';
import { PROBLEM_PLUS_MARKDOWN } from './problem_plus';

export const PROBLEM_DATASOURCE = [
  // {
  //   id: '4',
  //   content: PROBLEM_PLUS_MARKDOWN,
  // },
  {
    id: '1',
    content: PROBLEM_GCD_MARKDOWN,
  },
  {
    id: '2',
    content: PROBLEM_ARRAY_SORT_MARKDOWN,
  },
  {
    id: '3',
    content: PROBLEM_LIBRARY_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
