export const PROBLEM_HORSE_ROBBER_MARKDOWN = `
# HouseRobber
### *Problem ID: 11*

&nbsp;

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array $a$ representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256[] calldata a) external returns (uint256);
\`\`\`
- $a$: An array of $n$ integers. For $0$ &le; $i < n$, $a_i$ represent the amount of money at $i$-th house.
- This function need to return an integer which is the maximum amount of money you can rob.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $10^4$
- $0$ &le; $a_i$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([1, 2, 3, 1])
\`\`\`

The maximum amount of money you can rob is $4$ (which can be achieved by robbing house $0$ and $2$ for $a_0 + a_2 = 1 + 3 = 4$). The function should return the integer $4$.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve([2, 7, 9, 3, 1])
\`\`\`

The maximum amount of money you can rob is $12$ (which can be achieved by robbing house $0$, $2$ and $4$ for $a_0 + a_2 + a_4 = 2 + 9 + 1 = 12$). The function should return the integer $12$.


`;
