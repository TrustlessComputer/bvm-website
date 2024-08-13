import { PROBLEM_GCD_MARKDOWN } from './problem_gcd';
import { PROBLEM_ARRAY_SORT_MARKDOWN } from './problem_array-sort';
import { PROBLEM_LIBRARY_MARKDOWN } from './problem_library';
import { PROBLEM_PLUS_MARKDOWN } from './problem_a-plus-b';
import { PROBLEM_COURSES_MARKDOWN } from './problem_courses';
import { PROBLEM_RANGE_ADDITION_MARKDOWN } from './problem_range-addition';
import { PROBLEM_PROTATION_MARKDOWN } from './problem_rotation';
import { PROBLEM_TRIANGLES_MARKDOWN } from './problem_triangles';
import { PROBLEM_JOSEPHUS_MARKDOWN } from './problem_josephus';
import { PROBLEM_XOR_QUERY_MARKDOWN } from './problem_xor_query';
import { PROBLEM_HORSE_ROBBER_MARKDOWN } from './problem_horse-robber';
import { PROBLEM_HAMMING_DISTANCE_MARKDOWN } from './problem_hamming-distance';
import { PROBLEM_CLOSEST_SUM_MARKDOWN } from './problem_closest-sum';
import { PROBLEM_SPLIT_ARRAY_MARKDOWN } from './problem_split-array';
import { PROBLEM_NO_REPEAT_MARKDOWN } from './problem_no-repeat';

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
  {
    id: '5',
    content: PROBLEM_TRIANGLES_MARKDOWN,
  },
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
  {
    id: '9',
    content: PROBLEM_JOSEPHUS_MARKDOWN,
  },
  {
    id: '10',
    content: PROBLEM_XOR_QUERY_MARKDOWN,
  },
  {
    id: '11',
    content: PROBLEM_HORSE_ROBBER_MARKDOWN,
  },
  {
    id: '12',
    content: PROBLEM_HAMMING_DISTANCE_MARKDOWN,
  },
  {
    id: '13',
    content: PROBLEM_CLOSEST_SUM_MARKDOWN,
  },
  {
    id: '14',
    content: PROBLEM_SPLIT_ARRAY_MARKDOWN,
  },
  {
    id: '15',
    content: PROBLEM_NO_REPEAT_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
