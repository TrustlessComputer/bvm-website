import { PROBLEM_GCD_MARKDOWN } from './problem_gcd';
import { PROBLEM_ARRAY_SORT_MARKDOWN } from './problem_array-sort';
import { PROBLEM_LIBRARY_MARKDOWN } from './problem_library';
import { PROBLEM_PLUS_MARKDOWN } from './problem_a-plus-b';
import { PROBLEM_COURSES_MARKDOWN } from './problem_courses';
import { PROBLEM_RANGE_ADDITION_MARKDOWN } from './problem_range-addition';
import { PROBLEM_PROTATION_MARKDOWN } from './problem_rotation';

export const PROBLEM_DATASOURCE = [
  {
    id: '4',
    content: PROBLEM_PLUS_MARKDOWN,
  },
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
  // {
  //   id: '5',
  //   content: PROBLEM_LIBRARY_MARKDOWN,
  // },
  {
    id: '6',
    content: PROBLEM_PROTATION_MARKDOWN,
  },
  {
    id: '7',
    content: PROBLEM_RANGE_ADDITION_MARKDOWN,
  },
  {
    id: '8',
    content: PROBLEM_COURSES_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
