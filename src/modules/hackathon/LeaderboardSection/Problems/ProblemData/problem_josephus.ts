export const PROBLEM_JOSEPHUS_MARKDOWN = `
# Josephus
### *Problem ID: 9*

&nbsp;

There are $n$ friends that are playing a game. The friends are sitting in a circle and are numbered from $0$ to $n-1$ in clockwise order. More formally, moving clockwise from friend $i$ brings you to the friend $i+1$ for $0$ &le; $i$ < $n-1$, and moving clockwise from friend $n-1$ brings you to the friend $0$.

&nbsp;

The rules of the game are as follows:

- Start at a chosen friend.
- Count the next $k$ friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
- The last friend you counted leaves the circle and loses the game.
- If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
- Otherwise, the last friend in the circle wins the game.

&nbsp;

Given the number of friends $n$, and an integer $k$. Your task are:
1. Given the index $p$ of the initial chosen friend, find the index $q$ of the friend who wins the game.
2. Given an index $y$, find the index $x$ of the initial chosen friend so that the friend with index $y$ wins the game.

&nbsp;

## Implementation details:

&nbsp;

Your smart contract needs to implement the following function(s):
\`\`\`js
function solve(uint n, uint k, uint p, uint y) external returns (bool);
\`\`\`
- $n$, $k$, $p$, $y$: Four integer whose meaning are described in the statement.
- This function need to return an array of two integer $[q, x]$ which are the answers of the required tasks.
- For each test case, this function will be called exactly once with gas limit of $100\,000\,000$.

## Constraints:
- $1$ &le; $n, k$ &le; $10^5$
- $0$ &le; $p, y$ < $n$

&nbsp;

## Examples:

&nbsp;

### Example 1

&nbsp;

Consider the following function call:

\`\`\`js
solve(7, 3, 0, 2)
\`\`\`

For the first task, the index of the friends remaining in the circle after each round are as follows (\`v\` indicate the friend removed after each round) 

\`\`\`js
    v
0 1 2 3 4 5 6
        v
0 1 3 4 5 6
  v
0 1 3 4 6
      v
0 3 4 6
    v
0 3 4
v
0 3

3
\`\`\`

&nbsp;

For the second task, the index of the friends remaining in the circle after each round are as follows (\`v\` indicate the friend removed after each round) 

\`\`\`js
  v            
0 1 2 3 4 5 6
      v    
0 2 3 4 5 6
v            
0 2 3 5 6
    v
2 3 5 6
  v 
2 3 6
  v
2 6

2
\`\`\`

The function should return the array $[3, 6]$.



`;
