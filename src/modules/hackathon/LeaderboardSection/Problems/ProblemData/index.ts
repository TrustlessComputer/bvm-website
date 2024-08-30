import { PROBLEM_GCD_MARKDOWN } from './2_1_GCD';
import { PROBLEM_ARRAY_SORT_MARKDOWN } from './3_2_ArraySort';
import { PROBLEM_LIBRARY_MARKDOWN } from './4_3_Library';
import { PROBLEM_PLUS_MARKDOWN } from './1_4_APlusB';
import { PROBLEM_COURSES_MARKDOWN } from './8_8_Courses';
import { PROBLEM_RANGE_ADDITION_MARKDOWN } from './7_7_RangAddition';
import { PROBLEM_PROTATION_MARKDOWN } from './6_6_Rotation';
import { PROBLEM_TRIANGLES_MARKDOWN } from './5_5_Triangles';
import { PROBLEM_JOSEPHUS_MARKDOWN } from './9_9_Josephus';
import { PROBLEM_XOR_QUERY_MARKDOWN } from './10_10_XorQuery';
import { PROBLEM_HORSE_ROBBER_MARKDOWN } from './11_11_HorseRobber';
import { PROBLEM_HAMMING_DISTANCE_MARKDOWN } from './12_12_HammingDistance';
import { PROBLEM_CLOSEST_SUM_MARKDOWN } from './13_13_ClosestSum';
import { PROBLEM_SPLIT_ARRAY_MARKDOWN } from './14_14_SplitArray';
import { PROBLEM_NO_REPEAT_MARKDOWN } from './15_15_NoRepeat';
import { PROBLEM_A_TIMES_B_PLUS_C } from './16_21_ATimesBPlusC';
import { PROBLEM_REPEAT_MODULO_MARKDOWN } from './17_22_RepeatModulo';
import { PROBLEM_PRODUCT_K_INTEGER_MARKDOWN } from './18_23_ProductKInteger';
import { PROBLEM_GRID_POWER_MARKDOWN } from './19_24_GridPower';
import { PROBLEM_TEAM_SPLITTING_MARKDOWN } from './20_26_TeamSplitting';

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
  {
    id: '16',
    content: PROBLEM_A_TIMES_B_PLUS_C,
  },
  {
    id: '17',
    content: PROBLEM_REPEAT_MODULO_MARKDOWN,
  },
  {
    id: '18',
    content: PROBLEM_PRODUCT_K_INTEGER_MARKDOWN,
  },
  {
    id: '19',
    content: PROBLEM_GRID_POWER_MARKDOWN,
  },
  {
    id: '20',
    content: PROBLEM_TEAM_SPLITTING_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
