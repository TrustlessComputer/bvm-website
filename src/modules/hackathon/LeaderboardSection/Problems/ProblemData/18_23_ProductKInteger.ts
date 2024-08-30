export const PROBLEM_PRODUCT_K_INTEGER_MARKDOWN = `
# ProductKInteger
### *Problem ID: 23*

&nbsp;

Given an array $a$ of $n$ integers and an integer $k$. Choose exactly $k$ element from array $a$ so that the product of $k$ chosen integers is maximized.

Since the answer can be very large, return the remainder of the answer modulo $10^9 + 7$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(int256[] calldata a, uint256 k) external returns (uint256);
\`\`\`
- $a$: An array of length $n$.
- $k$: A positive integer.
- This function need to return the value of maximum product modulo $10^9 + 7$.
- This function will be called exactly once with gas limit of $10\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $k$ &le; $n$ &le; $1000$
- $-10^9$ &le; $a_i$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve([-3, 4, 1, 2, -2], 3)
\`\`\`

The maximum product can be achieved by choosing $-3$, $4$ and $-2$, which has product $(-3) \times 4 \times (-2) = 24$.

The function therefore should return $24$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve([-3, 4, 1, 2, -2], 2)
\`\`\`

The maximum product can be achieved by choosing $4$ and $2$, which has product $4 \times 2 = 8$.

The function therefore should return $8$.

&nbsp;

### Example 3:

&nbsp;

Consider the following function call:

\`\`\`js
solve([-4, -3, -1, -2], 3)
\`\`\`

The maximum product can be achieved by choosing $-3$, $-1$ and $-2$, which has product $(-3)$ &times; $(-2)$ &times; $(-1) = -6$.

The function therefore should return $(-6) \bmod (10^9 + 7) = 10^9 + 1$.

&nbsp;

### Example 4:

&nbsp;

Consider the following function call:

\`\`\`js
solve([-4, -3, 0, -2], 3)
\`\`\`

The maximum product can be achieved by choosing $-4$, $-3$ and $0$, which has product $(-4)$ &times; $(-3)$ &times; $0 = 0$.

The function therefore should return $0$.



`;
