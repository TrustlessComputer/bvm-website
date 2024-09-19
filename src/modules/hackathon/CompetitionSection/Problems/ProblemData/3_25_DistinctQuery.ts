export const PROBLEM_DISTINCT_QUERY_MARKDOWN = `
# DistinctQuery
### *Problem ID: 25*

&nbsp;

You are given a zero-indexed array $a$ of $n$ elements whose value are integers ranged from $0$ to $n-1$. Process $q$ queries, the $i$-th query denoted by two integers $l_i$ and $r_i$, require calculating the number of distinct value of elements with index from $l_i$ to $r_i$ of array $a$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256[] calldata a, uint256[] calldata l, uint256[] calldata r) external returns (uint256[] memory);
\`\`\`
- $a$: An array of length $n$. For $0$ &le; $i < n$, $a_i$ is the value of the $i$-th element of array $a$.
- $l$, $r$: Two arrays of length $q$. For $0$ &le; $i < q$, $l_i$ and $r_i$ describe the $i$-th query.
- This function need to return an array $t$ of length $q$. For $0$ &le; $i < q$, $t_i$ is the answer of the $i$-th query.
- This function will be called exactly once with gas limit of $70\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n, q$ &le; $5000$
- $0$ &le; $a_i < n$
- $0$ &le; $l_i$ &le; $r_i < n$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve([0, 1, 2, 1, 2], [1, 2, 0], [3, 2, 4])
\`\`\`

For the first query, all elements from index $1$ to index $3$ are $[1, 2, 1]$. There are $2$ distinct value ($1$ and $2$) among these elements.

For the second query, all elements from index $2$ to index $2$ are $[2]$. There are $1$ distinct value ($2$) among these elements.

For the third query, all elements from index $0$ to index $4$ are $[0, 1, 2, 1, 2]$. There are $3$ distinct value ($0$, $1$, $2$) among these elements.

The function therefore should return the array $t = [2, 1, 3]$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve([3, 1, 2, 2, 1, 0, 0, 3], [1, 0, 4, 2, 0], [6, 7, 7, 3, 4])
\`\`\`

The function should return the array $t = [3, 4, 3, 1, 3]$.


`;
