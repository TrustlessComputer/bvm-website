export const PROBLEM_COURSES_MARKDOWN = `
# Courses
### *Problem ID: 8*

&nbsp;

There are a total of $n$ courses you have to take, labeled from $0$ to $n-1$. You are given two array $a$ and $b$ of length $m$ that describe $m$ prerequisites, where the $i$-th one require that you must take course $b_i$ first if you want to take course $a_i$. Check whether you can finish all courses.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint n, uint[] calldata a, uint[] calldata b) external returns (bool);
\`\`\`
- $n$: An integer, which is the number of courses.
- $a$, $b$: Two arrays of length $m$. For $0 \le i < m$, $a_i$ and $b_i$ describe the $i$-th prerequisite. It is guaranteed that no two prerequisites are the same.
- This function need to return the boolean \`True\` if it is possible to finish all courses, and \`False\` otherwise.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $100$
- $0$ &le; $m$ &le; $5\,000$
- $0$ &le; $a_i, b_i$ < $n$, $a_i$ &ne; $b_i$
- No two prerequisites are the same

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve(2, [0], [1])
\`\`\`

The only requirement is to learn course $1$ before course $0$. So one can learn all courses by learning course $1$ then course $0$. The function should return \`True\`.

&nbsp;

### Example 2

&nbsp;

Consider the following function call:

\`\`\`js
solve(2, [1, 0], [0, 1])
\`\`\`

It is impossible to learn any course. The function should return \`False\`.


`;
