export const PROBLEM_3_MARKDOWN = `The BVM Land has $n$ cities connected by $m$ bidirectional roads. The cities are numbered from $0$ to $n-1$, and the roads are numbered from $0$ to $m-1$. The $i$-th road connects two cities $u_i$ and $v_i$. 

&nbsp;  

The government of BVM Land wishes to build libraries in some cities so that from any city, it is possible to reach a city with a library. It is known that the cost of building a library in city $i$ is $a_i$. Determine the minimum total cost of building libraries.

&nbsp;  

## Implementation details:

&nbsp;  

Your smart contract needs to implement the following function(s):

&nbsp;  
\`\`\`
function solve(uint256[] memory a, uint256[] memory u, uint256[] memory v) external pure returns (uint256);
\`\`\`

&nbsp;  
- $a$: Array of length $n$. For $0$ &le; $i < n$, $a_i$ is the cost of building a library in city $i$.
- $u$, $v$: Two arrays of length $m$. For $0$ &le; $i < m$, $u_i$ and $v_i$  - describing the $i$-th road. It is guaranteed that no two roads connect the same pair of cities, and no road connects a city to itself.
- This function need to return a single integer, which is the minimum total cost of building libraries.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;  

## Constraints:

&nbsp;  
- $1$ &le; $n$ &le; $5\,000$
- $0$ &le; $m$ &le; 5\,000$
- $0$ &le; $u_i, v_i < n$, $u_i$ &ne; $v_i$
- $1$ &le; $a_i$ &le; $10^{9}$
- No two roads connect the same pair of cities.

&nbsp;  

## Examples:

&nbsp;  

### Example 1

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`
solve([5, 7, 3, 2, 8], [0, 1, 2, 3], [4, 2, 3, 1])
\`\`\`

&nbsp;  

One can build libraries in cities $0$ and $3$ with a total cost of $a_0 + a_3 = 5 + 2 = 7$. Then:

&nbsp;  

- From cities $1, 2, 3$, it is possible to reach city $3$ (the city with a library)
- From cities $0, 4$, it is possible to reach city $3$ (the city with a library)

&nbsp;  

This is also the minimum total cost achievable. Therefore, the function should return the value $7$.

&nbsp;  

### Example 2

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`
solve([6, 2, 4, 5, 9], [], [])
\`\`\`

&nbsp;  

Since there are no connection between the cities, one must build a library in each city. The total cost is $6 + 2 + 4 + 5 + 9 = 26$. Therefore, the function should return the value $26$.
`;
