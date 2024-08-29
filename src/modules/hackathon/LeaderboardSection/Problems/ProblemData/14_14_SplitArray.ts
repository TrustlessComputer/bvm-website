export const PROBLEM_SPLIT_ARRAY_MARKDOWN = `
# SplitArray
### *Problem ID: 14*

&nbsp;

Given an array $a$ of $n$ non-negative integers and a number $k$, split array $a$ into $k$ subarray such that the largest sum of any subarray is minimized.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint[] calldata a, uint k) external returns (uint);
\`\`\`
- $a$: Array of length $n$.
- $k$: An integer, denoting the number of parts to split array $a$ into
- This function need to return the minimum largest sum possible.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n, k$ &le; $2000$
- $0$ &le; $a_i$ &le; $10^6$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([7, 2, 5, 10, 8], 2)
\`\`\`

The most optimal ways is to split $a$ into $[7, 2, 5]$ and $[10, 8]$. The sum of each subarray is $14$ and $18$, and the largest among those is $18$. The function should return the integer $18$.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve([7, 2, 5, 10, 8], 3)
\`\`\`

The most optimal ways is to split $a$ into $[7, 2, 5]$, $[10]$ and $[8]$. The sum of each subarray is $14$, $10$ and $8$, and the largest among those is $14$. The function should return the integer $14$.

`;
