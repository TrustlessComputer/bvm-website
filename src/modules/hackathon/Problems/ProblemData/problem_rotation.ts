export const PROBLEM_PROTATION_MARKDOWN = `
# Rotation
### *Problem ID: 6*

&nbsp;

Suppose an array of length $n$ sorted in ascending order is rotated between $1$ and $n$ times. For example, the array $nums = [1,2,4,5,6]$ might become:
- $[4,5,6,1,2]$ if it was rotated 3 times.
- $[1,2,4,5,6]$ if it was rotated 5 times.

&nbsp;

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256[] calldata nums) external returns (uint256[] memory);
\`\`\`
- $nums$: Array of length $n$ that is sorted and rotated between $1$ and $n$ times.
- This function need to return an integer, which is the minimum elements of array $nums$.
- For each test case, this function will be called exactly once with gas limit of $6\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $20\,000$
- $0$ &le; $a_i$ &le; $10^{9}$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([1, 2, 4, 5, 6])
\`\`\`

The function should return the integer $1$.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve([4, 5, 6, 1, 2])
\`\`\`

The function should return the integer $1$.


`;
