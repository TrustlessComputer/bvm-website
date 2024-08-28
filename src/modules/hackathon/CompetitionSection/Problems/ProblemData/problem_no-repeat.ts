export const PROBLEM_NO_REPEAT_MARKDOWN = `
# NoRepeat
### *Problem ID: 17*

&nbsp;

Given a string $input$ of lowercase latin character, find the length of the longest substring of $input$ that without repeating characters.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(string calldata s) external returns (uint256);
\`\`\`
- $s$: String of length $n$.
- This function need to return the length of the longest substring without repeating characters of $input$.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

&nbsp;

## Constraints:
- $1$ &le; $n$ &le; $10000$
- $s_i$ only consist of lowercase latin character

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve("abcabcbb")
\`\`\`

One of the longest repeating substring without repeating is \`abc\`, with the length of $3$. The function therefore should return the integer $3$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve("bbbbb")
\`\`\`

The only repeating substring without repeating is \`b\`, with the length of $1$. The function therefore should return the integer $1$.

### Example 3:

Consider the following function call:

\`\`\`js
script("pwwkew")
\`\`\`

One of the longest repeating substring without repeating is \`wke\`, with the length of $3$. The function therefore should return the integer $3$.

&nbsp;

Notice that the answer must be a substring, \`pwke\` is a subsequence and not a substring.

`;
