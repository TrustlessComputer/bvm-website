export const PROBLEM_FAVORITE_NUMBERS_MARKDOWN = `
# Favorite Numbers
### *Problem ID: 28*

&nbsp;

Ringo loves the integer $200$. Solve the problem below for him.

Given a sequence $A$ of $N$ positive integers, find the pair of integers $(i,j)$ satisfying all of the following conditions:

* $1$ &le; $i < j$ &le; $N$
* $A_i - A_j$ is a multiple of $200$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(int256[] calldata a) external returns (uint256);
\`\`\`
- $a$: An array of length $n$.
- This function need to return the number of pair of integers satisfying the problem.
- This function will be called exactly once with gas limit of $1\,000\,000$.

&nbsp;

## Constraints:
- $2$ &le; $N$ &le; $2$ &times; $10^3$
- $1$ &le; $A_i$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve([123, 223, 123, 523, 200, 2000])
\`\`\`

For example, for $(i,j)=(1,3)$, $A_1 - A_3 =0$ is a multiple of 200. 

We have four pairs satisfying the conditions: $(i,j)=(1,3),(1,4),(3,4),(5,6)$.

The function therefore should return $4$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve([1, 2, 3, 4, 5])
\`\`\`

There is no pair satisfying the conditions.

The function therefore should return $0$.

&nbsp;

### Example 3:

&nbsp;

Consider the following function call:

\`\`\`js
solve([199, 100, 200, 400, 300, 500, 600, 200])
\`\`\`

The function therefore should return $9$.





`;
