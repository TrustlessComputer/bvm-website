export const PROBLEM_CLOSEST_SUM_MARKDOWN = `
# ClosestSum
### *Problem ID: 13*

&nbsp;

Given a sorted integer array $input$ of length $n$ and an integer $target$, find three integers in $input$ such that the sum is closest to $target$.

Return the smallest absolute different between $target$ and the sum of the three integers.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(int256[] calldata input, int256 target) external returns (uint256)
\`\`\`
- $input$: Array of length $n$. It is guaranteed that $input$ is sorted.
- $target$: An integer.
- This function need to return smallest absolute different between $target$ and the sum of the three integers.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $200$
- $1$ &le; $input_i$ &le; $10^8$
- $1$ &le; $target$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([-3, -2, 1, 4], 1)
\`\`\`

Following are all possible sum of three integers:
- $a_0 + a_1 + a_2 = -3 + -2 + 1 = -4$
- $a_0 + a_1 + a_3 = -3 + -2 + 4 = -1$
- $a_0 + a_2 + a_3 = -3 + 1 + 4 = 2$
- $a_1 + a_2 + a_3 = -2 + 1 + 4 = 3$

&nbsp;

Among them, the sum $2$ has the closest distance to $target = 1$. The distance is $|2 - 1| = 1$. The function should return the integer $1$.


`;
