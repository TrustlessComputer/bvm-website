export const PROBLEM_RANGE_ADDITION_MARKDOWN = `
You are given an $m \times n$ matrix $M$ initialized with all $0$'s and an array of operations $ops$ of length $k$, where $ops_i = [a_i, b_i]$ means $M_{x, y}$ should be incremented by one for all $0 \le x < a_i$ and $0 \le y < b_i$.

&nbsp;  

Count and return the number of maximum integers in the matrix after performing all the operations.

&nbsp;  

## Implementation details:

&nbsp;  

Your smart contract needs to implement the following function(s):
\`\`\`solidity
function solve(uint256 m, uint256 n, uint256[][] calldata ops) external returns (uint256);
\`\`\`
&nbsp;  

- $m$, $n$: Two integers, which describe the size of matrix $M$.
- $ops$: An array of length $k$, where $ops[i]$ contains two integers $a_i$ and $b_i$ describing the $i$-th operation.
- This function need to return an integer, which is the number of maximum integers in the matrix after performing all the operations.
- For each test case, this function will be called exactly once with gas limit of $10\,000\,000$.

&nbsp;  

## Constraints:
- $1$ &le; $m, n$ &le; $10^9$
- $0$ &le; $k$ &le; $5\,000$
- $1$ &le; $a_i$ &le; $m$, $1$ &le; $b_i$ &le; $n$

&nbsp;  

## Examples:

&nbsp;  

### Example 1

&nbsp;  

Consider the following function call:

\`\`\`solidity
solve(3, 3, [[2, 2], [3, 3]])
\`\`\`

&nbsp;  

The following figure describe the change of matrix $M$ after performing the operations:

\`\`\`solidity
0 0 0    1 1 0    2 2 1
0 0 0 => 1 1 0 => 2 2 1
0 0 0    0 0 0    1 1 1
\`\`\`

&nbsp;  

The maximum integer in $M$ is $2$, and there are $4$ of it in $M$. The function should return the integer $4$.

&nbsp;  

### Example 2

&nbsp;  

Consider the following function call:

\`\`\`solidity
solve(3, 3, [[2, 2], [3, 3], [3, 3], [3, 3], [2, 2], [3, 3], [3, 3], [3, 3], [2, 2], [3, 3], [3, 3], [3, 3]])
\`\`\`

&nbsp;  

The matrix $M$ after performing all operations is:

\`\`\`solidity
12 12 9
12 12 9
9  9  9
\`\`\`

&nbsp;  

The maximum integer in $M$ is $12$, and there are $4$ of it in $M$. The function should return the integer $4$.

&nbsp;  

### Example 3

&nbsp;  

Consider the following function call:

\`\`\`solidity
solve(3, 3, [])
\`\`\`

&nbsp;  

As there are no operation performed, the maximum integer in $M$ is $0$, and there are $9$ of it in $M$. The function should return the integer $9$.

`;
