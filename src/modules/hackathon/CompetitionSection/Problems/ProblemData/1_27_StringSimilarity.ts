export const PROBLEM_STRING_SIMILARITY_MARKDOWN = `
# StringSimilarity
### *Problem ID: 27*

&nbsp;

A binary string is a string where each character is either $0$ or $1$. Two binary strings $a$ and $b$ of equal length are similar, if they have the same character in some position (there exists an integer $i$ such that $a_i=b_i$). For example:

&nbsp;

* \`10010\` and \`01111\` are similar (they have the same character in position 4);
* \`10010\` and \`11111\` are similar;
* \`111\` and \`111\` are similar;
* \`0110\` and \`1001\` are not similar.

&nbsp;

You are given an integer $n$ and a binary string s consisting of $2n−1$ characters. Let's denote $s[l..r]$ as the contiguous substring of s starting with l-th character and ending with r-th character (in other words, $s[l..r]=s_ls_{l+1}s_{l+2}...s_r$).

You have to construct a binary string $w$ of length $n$ which is similar to all of the following strings: $s[1..n], s[2..n+1], s[3..n+2], ..., s[n..2n−1]$.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(string memory s) external returns (string memory);
\`\`\`
- $s$: One string ---  the binary string $s$ of length $2n−1$. Each character $s_i$ is either \`0\` or \`1\`.
- This function need to return one string --- the corresponding binary string $w$ of length $n$.
- This function will be called exactly once with gas limit of $1\,000\,000$.

## Constraints:
- $1$ &le; $|s|$ &le; $1000$

&nbsp;

## Examples:

&nbsp;

### Example 1:

&nbsp;

Consider the following function call:

\`\`\`js
solve(1)
\`\`\`

* $1$ is similar to $s[1..1]=1$.

The function therefore should return $1$.

&nbsp;

### Example 2:

&nbsp;

Consider the following function call:

\`\`\`js
solve(00000)
\`\`\`

* $000$ is similar to $s[1..3]=000$;
* $000$ is similar to $s[2..4]=000$;
* $000$ is similar to $s[3..5]=000$.

The function therefore should return $000$.

&nbsp;

### Example 3:

&nbsp;

Consider the following function call:

\`\`\`js
solve(1110000)
\`\`\`

* **10**1**0** is similar to $s[1..4]$=**1**1**10**;
* **1**01**0** is similar to $s[2..5]$=**1**10**0**;
* **10**1**0** is similar to $s[3..6]$=**10**0**0**;
* 1**0**1**0** is similar to $s[4..7]$=0**0**0**0**.

The function therefore should return $1010$.

&nbsp;

### Example 4:

&nbsp;

Consider the following function call:

\`\`\`js
solve(101)
\`\`\`
 &textbf;
* 0**0** is similar to $s[1..2]$=1**0**;
* **0**0 is similar to $s[2..3]$=**0**1.

The function therefore should return $000$.


`;
