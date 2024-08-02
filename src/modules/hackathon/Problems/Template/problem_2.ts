export const PROBLEM_2_MARKDOWN = `## Practice

&nbsp;  

Given an array $a$ of $n$ non-negative integers, sort the array in non-descending order.

&nbsp;  

## Implementation details:
&nbsp;  

Your smart contract needs to implement the following function(s):
\`\`\`solidity
function solve(uint256[] memory a) external pure returns (uint256[] memory);
\`\`\`

&nbsp;  
- $a$: Array of length $n$.
- This function need to return an array of length $n$, which is the elements of array $a$ sorted in non-descending order.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;  

## Constraints:
- $1$ &le; $n$ &le; $500$
- $1$ &le; $a_i$ &le; $10^{9}$

&nbsp;  

## Examples:

&nbsp;  

### Example 1

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`solidity
solve([4, 1, 3, 2, 1])
\`\`\`

&nbsp;  

The function should return the array $[1, 1, 2, 3, 4]$.

&nbsp;  

### Example 2

&nbsp;  

Consider the following function call:

&nbsp;  

\`\`\`solidity
solve([100, 100, 100])
\`\`\`

&nbsp;  

The function should return the array $[100, 100, 100]$.

`;
