export const PROBLEM_1_MARKDOWN = `
## Practice

&nbsp;  

Given two positive integers $a$ and $b$, find the greatest common divisor (GCD) of $a$ and $b$, which is defined as the largest integer $c$ such that $c$ divide both $a$ and $b$.

&nbsp;  
     
## Implementation details:
&nbsp;  

Your smart contract needs to implement the following function(s):

&nbsp;  
\`\`\`solidity
function solve(uint256 a, uint256 b) external pure returns (uint256);
\`\`\`

&nbsp;  

- $a$, $b$: Two positive integers.
- This function need to return the greatest common divisor of $a$ and $b$.
- For each test case, this function will be called exactly once with gas limit of $1\,000\,000$.

&nbsp;  

## Constraints:
&nbsp;

- $1$ &le; $a, b$ &le; $10^{18}$


&nbsp;  

## Examples:
&nbsp;  

### Example 1

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`solidity
solve(24, 30)
\`\`\`

&nbsp;  

Two numbers $24$ and $30$ has four common divisors: $1$, $2$, $3$ and $6$. Among them, $6$ is the greatest. Therefore, the function should return the value $6$.

&nbsp;  

### Example 2

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`solidity
solve(1, 100)
\`\`\`

&nbsp;  

Two numbers $1$ and $100$ only has one common divisor: $1$ Therefore, the function should return the value $1$.
`;
