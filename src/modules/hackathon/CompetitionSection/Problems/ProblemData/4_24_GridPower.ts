export const PROBLEM_GRID_POWER_MARKDOWN = `
# GridPower
### *Problem ID: 24*

&nbsp;

The BVM city can be described as a grid of $n$ rows and $n$ columns. The rows are numbered from $0$ to $n-1$, and the columns are numbered from $0$ to $n-1$. The cell on the $x$-th row and $y$-th column is denoted cell $(x, y)$. 

&nbsp;

Each cell has an energy level that is initially equal to $0$. There are $m$ power stations, the $i$ power station is located at cell $(x_i, y_i)$ with power level $c_i$. For all cell $(x, y)$, the $i$ power station will increase the energy level of cell $(x, y)$ by $max(0, c_i - (abs(x - x_i) + abs(y - y_i)))$.

&nbsp;

Find the maximum energy level across all cells in the BVM city.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256 n, uint256[] calldata x, uint256[] calldata y, uint256[] calldata c) external returns (uint256);
\`\`\`
- $n$: A positive integer.
- $x$, $y$, $c$: Three arrays of length $m$. For $0$ &le; $i < m$, $x_i$, $y_i$ and $c_i$ describes the location and the power level of the $i$-th power station. Note that the location of the power station are not necessarily distinct.
- This function need to return the maximum energy level across all cells.
- This function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $50$
- $1$ &le; $m$ &le; $5\,000$
- $1$ &le; $c_i$ &le; $50$
- $0$ &le; $x_i, y_i < n$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve(4, [0, 2], [0, 3], [1, 3])
\`\`\`

There are two power plants, one located at cell $(0, 0)$ with power level $1$, the other located at cell $(2, 3)$ with power level $3$. 
The following table describe the energy level of each cell in the grid.

\`\`\`js
1 1 1 1
0 1 2 2
0 1 2 3
0 1 2 2
\`\`\`

The maximum energy level across all cells are $3$ (at cell $(2, 3)$). The function therefore should return $3$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve(6, [4, 0, 1], [4, 1, 2], [3, 5, 2])
\`\`\`

There are three power plants:
- $1$-st one located at cell $(4, 4)$ with power level $3$.
- $2$-nd one located at cell $(0, 1)$ with power level $5$.
- $3$-rd one located at cell $(1, 2)$ with power level $2$.

The following table describe the energy level of each cell in the grid.

\`\`\`js
4 6 5 4 2 1
4 5 6 4 2 1
3 4 5 5 3 2
2 2 3 4 4 3
1 1 2 3 4 3
0 0 1 2 2 2
\`\`\`

The sum of energy level across all cells are $6$ (at cell $(0, 1)$ and $(1, 2)$). The function therefore should return $6$.

`;
