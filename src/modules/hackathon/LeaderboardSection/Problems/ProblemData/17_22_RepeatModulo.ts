export const PROBLEM_REPEAT_MODULO_MARKDOWN = `
# RepeatModulo
### *Problem ID: 22*

&nbsp;

Given three positive integers $x$, $n$ and $m$. Let $y$ be the number obtained by writing the number $x$ repeated for $n$ times. Calculate $y \bmod m$. 

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256 x, uint256 n, uint256 m) external returns (uint256);
\`\`\`
- $x$, $n$, $m$: three positive integers whose meaning are described in the statement
- This function need to return the value of $y \bmod m$
- This function will be called exactly once with gas limit of $10\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $x, n, m$ &le; $10^{18}$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve(123, 3, 784)
\`\`\`

$y = 123123123$ (number $x = 123$ repeated for $n = 3$ times) and $y \bmod m = 123123123 \bmod 784 = 627$

The function therefore should return $627$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve(123, 100, 100000)
\`\`\`

The function should return $23123$.


`;
