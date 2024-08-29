import { PROBLEM_A_TIMES_B_PLUS_C } from './1_21_ATimesBPlusC';
import { PROBLEM_REPEAT_MODULO_MARKDOWN } from './2_22_RepeatModulo';
import { PROBLEM_PRODUCT_K_INTEGER_MARKDOWN } from './3_23_ProductKInteger';
import { PROBLEM_GRID_POWER_MARKDOWN } from './4_24_GridPower';
import { PROBLEM_TEAM_SPLITTING_MARKDOWN } from './5_26_TeamSplitting';

export const PROBLEM_DATASOURCE = [
  {
    id: '21',
    content: PROBLEM_A_TIMES_B_PLUS_C,
  },
  {
    id: '22',
    content: PROBLEM_REPEAT_MODULO_MARKDOWN,
  },
  {
    id: '23',
    content: PROBLEM_PRODUCT_K_INTEGER_MARKDOWN,
  },
  {
    id: '24',
    content: PROBLEM_GRID_POWER_MARKDOWN,
  },
  {
    id: '26',
    content: PROBLEM_TEAM_SPLITTING_MARKDOWN,
  },
];

export const PROBLEM_MAPPING = PROBLEM_DATASOURCE.reduce(
  (prev, item) => ({ ...prev, [item.id]: item.content }),
  {} as Record<string, string>,
);
