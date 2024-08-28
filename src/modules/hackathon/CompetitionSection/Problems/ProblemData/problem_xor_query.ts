export const PROBLEM_XOR_QUERY_MARKDOWN = `
# XorQuery
### *Problem ID: 10*

&nbsp;

You are given an array $a$ of positive integers. Process $q$ queries, the $i$-th query denoted by two number $l_i$ and $r_i$, requires computing the [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation#XOR) of all elements with index from $l_i$ to $r_i$ of array $a$ (that is, $a[l_i]$ &oplus; $arr[l_i + 1]$ &oplus; ... &oplus; $arr[r_i]$ where $a$ &oplus; $b$ denote the bitwise XOR between $a$ and $b$).

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint[] calldata a, uint[] calldata l, uint[] calldata r) external returns (uint[] memory);
\`\`\`
- $a$: Array of length $n$.
- $l$, $r$: Two arrays of length $q$. For $0 \le i < q$, $l_i$ and $r_i$ describe the $i$-th query.
- This function need to return an array $t$ of $q$ integers, where $t_i$ is the answer of the $i$-th query.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n, q$ &le; $5000$
- $1$ &le; $a_i$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([1, 3, 4, 8], [0, 1, 0, 3], [1, 2, 3, 3])
\`\`\`

The answer of each queries are as follows:
- Query $0$ ($l = 0$, $r = 1$): $a_0$ &oplus; $a_1 = 1$ &oplus; $3 = 2$
- Query $1$ ($l = 1$, $r = 2$): $a_1$ &oplus; $a_2 = 3$ &oplus; $4 = 7$
- Query $2$ ($l = 0$, $r = 3$): $a_0$ &oplus; $a_1$ &oplus; $a_2$ &oplus; $a_3 = 1$ &oplus; $3$ &oplus; $4$ &oplus; $8$ = $14$
- Query $3$ ($l = 3$, $r = 3$): $a_3 = 8$

The function should return the array $[2, 7, 14, 8]$.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve([4, 8, 2, 10], [2, 1, 0, 0], [3, 3, 0, 3])
\`\`\`

The function should return the array $[8, 0, 4, 4]$.


`;
