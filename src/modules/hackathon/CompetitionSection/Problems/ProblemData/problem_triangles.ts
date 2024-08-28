export const PROBLEM_TRIANGLES_MARKDOWN = `
# Triangles
### *Problem ID: 5*

&nbsp;

Given a sorted array $a$ of $n$ positive integers,  Count the number of sets $(i, j, k)$ that $i<j<k$ and edges of length $A_i$, $A_j$, $A_k$ can form a triangle.

For example, you can’t form an triangle out of three edges of length $1$, $2$, and $4$ 
 
&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):

\`\`\`js
function solve(uint256[] calldata a) external returns (uint256);
\`\`\`

- $a$: Array of length $n$.
- This function need to return a single integer, which is the number of sets of edges that can form a triangle.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;
 
## Constraints:
- $1$ &le; $n$ &le; $200$
- $1$ &le; $a_i$ &le; $1e9$

&nbsp;

## Examples:
 
&nbsp;

### Example 1
 
&nbsp;

Consider the following function call:

\`\`\`javascript
solve([1, 2, 3, 4])
\`\`\`

The function should return 1, since only 1 set of edges of length 2, 3, 4 can make up a triangle.

&nbsp;
 
### Example 2
 
&nbsp;

Consider the following function call:

\`\`\`javascript
solve([1, 1, 2, 3, 4, 7, 6, 9])
\`\`\`

The function should return 9.

`;
