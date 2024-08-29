export const PROBLEM_A_TIMES_B_PLUS_C = `
# ATimesBPlusC
### *Problem ID: 21*

&nbsp;

Given a positive integer $n$. Count the number of triplet of positive integers $(a, b, c)$ such that $a * b + c = n$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256 n) external returns (uint256);
\`\`\`
- $n$: A positive integer.
- This function need to return the number of triplet required.
- For each test case, this function will be called exactly once with gas limit of $10\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $10^5$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve(4)
\`\`\`

All triplets $(a, b, c)$ that satisfy $a$ &times; $b + c = 4$ are: $(1, 1, 3)$, $(1, 2, 2)$, $(1, 3, 1)$, $(2, 1, 2)$, $(3, 1, 1)$.

The function therefore should return $5$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve(100)
\`\`\`

The function should return $473$.

`;
