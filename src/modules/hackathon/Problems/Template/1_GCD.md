Given two positive integers $a$ and $b$, find the greatest common divisor (GCD) of $a$ and $b$, which is defined as the largest integer $c$ such that $c$ divide both $a$ and $b$.


## Implementation details:

Your smart contract needs to implement the following function(s):
```
function solve(uint256 a, uint256 b) external pure returns (uint256);
```
- $a$, $b$: Two positive integers.
- This function need to return the greatest common divisor of $a$ and $b$.
- For each test case, this function will be called exactly once with gas limit of $1\,000\,000$.

## Constraints:
- $1 \le a, b \le 10^{18}$

## Examples:

### Example 1

Consider the following function call:

```
solve(24, 30)
```

Two numbers $24$ and $30$ has four common divisors: $1$, $2$, $3$ and $6$. Among them, $6$ is the greatest. Therefore, the function should return the value $6$.

### Example 2

Consider the following function call:

```
solve(1, 100)
```

Two numbers $1$ and $100$ only has one common divisor: $1$ Therefore, the function should return the value $1$.
