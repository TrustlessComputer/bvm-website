export const PROBLEM_HAMMING_DISTANCE_MARKDOWN = `
# HammingDistance
### *Problem ID: 12*

&nbsp;

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given an integer array $a$, return the sum of Hamming distances between all the pairs of the integers in $a$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint[] calldata a) external returns (uint);
\`\`\`
- $a$: Array of length $n$.
- This function need to return the sum of Hamming distances.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $5000$
- $1$ &le; $a_i$ &le; $10^9$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve([4, 14, 1])
\`\`\`

The last 4 bit of the binary representation of the three integers are:
- $4 = 0100_2$
- $14 = 1110_2$
- $1 = 0001_2$

&nbsp;

The pairwise Hamming distances are:
- $Hamming(4, 14) = Hamming(0100_2, 1110_2) = 2$
- $Hamming(4, 1) = Hamming(0100_2, 0001_2) = 2$
- $Hamming(14, 1) = Hamming(1110_2, 0001_2) = 4$

&nbsp;

The sum of Hamming distances is $2 + 2 + 4 = 8$. The function should return the integer $8$.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve([4, 14, 4])
\`\`\`

The function should return the integer $4$.

`;
