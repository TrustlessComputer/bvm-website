export const PROBLEM_TEAM_SPLITTING_MARKDOWN = `
# TeamSplitting
### *Problem ID: 26*

&nbsp;

The National Olympiad of Blockchain team consist of $n$ members. During a training session, the coach want to split $n$ members into the minimum number of teams possible, such that each team has no more than $k$ members.

Find the minimum number of teams possible and the number of different ways to split the members into minimum number of teams. Two ways are considered different if at least one team has a different members count. Since the answer can be very large, returns the number of ways modulo $10^9 + 7$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint256 n, uint256 k) external returns (uint256, uint256);
\`\`\`
- $n$, $k$: Two integers --- total number of members and maximum number of members allowed in one team.
- This function need to return two integer --- the minimum number of teams and the number of different ways to split the members modulo $10^9 + 7$.
- This function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $k$ &le; $n$ &le; $10^{7}$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve(7, 3)
\`\`\`

The minimum number of teams possible is $3$, and there are $6$ different ways to split the members:
- $[1, 3, 3]$
- $[2, 2, 3]$
- $[2, 3, 2]$
- $[3, 1, 3]$
- $[3, 2, 2]$
- $[3, 3, 1]$

The function therefore should return $(3, 6)$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve(10, 2)
\`\`\`

The minimum number of teams possible is $5$, and there are only one way to split the members: each team having $2$ members.

The function therefore should return $(5, 1)$.

`
