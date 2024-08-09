export const PROBLEM_PLUS_MARKDOWN = `
Given two integers $A$ and $B$. Return $A + B$.

&nbsp;

## Implementation details:
 
&nbsp;

Your smart contract needs to implement the following function(s):

\`\`\`solidity
function solve(uint256 a, uint256 b) external pure returns (uint256);
\`\`\`

&nbsp;

- $a$: First integer.
- $b$: Second integer.
- This function need to return a single integer.
- For each test case, this function will be called exactly once with gas limit of $1\,000\,000$.
 
&nbsp;
## Constraints:
- $1$ &le; $a$ &le; $500$
- $1$ &le; $b$ &le; $500$

&nbsp;

## Examples:
 
&nbsp;

### Example 1

&nbsp;

Consider the following function call:
\`\`\`solidity
solve(1, 1)
\`\`\`

&nbsp;

The function should return 2.

&nbsp;
 
### Example 2
 
&nbsp;

Consider the following function call:
\`\`\`solidity
solve(247, 123)
\`\`\`

&nbsp;

The function should return 370.`
