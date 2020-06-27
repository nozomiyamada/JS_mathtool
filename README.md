# JS_mathtool

JavaScript functions for mathematic calculations

https://nozomiyamada.github.io/tool.html

- `gcd_lcm.js` functions for calculating GCD(ห.ร.ม) and LCM(ค.ร.น)
- `statistics.js` functions for statistics
- `misc.js` other various functions

## `gcd_lcm.js`

|function name|description|
|:-:|:--|
|`gcd2(a,b)`|calculate GCD of positive integers `a` and `b` with Euclidean Algorithm|
|`gcd(nums)`|calculate GCD of all integers in array `nums`|
|`lcm2(a,b)`|calculate LCM of positive integers `a` and `b` by using equation `a*b=GCD*LCM`|
|`lcm(nums)`|calculate LCM of all integers in array `nums`|

## `statistics.js`


### Normal Distribution

![z_to_p](https://user-images.githubusercontent.com/44984892/85918560-24c55380-b88e-11ea-9c23-9b35270cb204.png)

|function name|description|
|:-:|:--|
|`z_to_pr(z, N=100)`|calculate one-sided Pr(0≤x<z) from z-score with Taylor expansion up to N-th order|
|`pr_to_z(p, N=300)`|calculate z-score from one-sided Pr(0≤x<z) with Taylor expansion up to N-th order|

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;Pr(0&space;\leq&space;x<z)&space;&=&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&\sim&space;\frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;Pr(0&space;\leq&space;x<z)&space;&=&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&\sim&space;\frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" title="\begin{align*} Pr(0 \leq x<z) &= \frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx \\ &= \frac{1}{2}{\rm erf}(z/\sqrt{2}) \\ &\sim \frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n+1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k} \end{align*}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;z(Pr)&space;&=&space;\sqrt{2}~{\rm&space;erf}^{-1}(2p)&space;\\&space;&\sim&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}\sqrt{\pi}Pr^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;z(Pr)&space;&=&space;\sqrt{2}~{\rm&space;erf}^{-1}(2p)&space;\\&space;&\sim&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}\sqrt{\pi}Pr^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" title="\begin{align*} z(Pr) &= \sqrt{2}~{\rm erf}^{-1}(2p) \\ &\sim \sum_{n=0}^{N}\frac{C_k}{2k+1}\sqrt{\pi}Pr^{2k+1} \\ &\text{where}~C_k = \sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m+1)(2m+1)} \end{align*}" /></a>

### Poisson Distribution

|function name|description|
|:-:|:--|
|`poisson(lambda, k)`|calculate Poisson Pr(X=k) with probability mass function|
|`poisson_cum(lambda, k)`|calculate cumulative Poisson Pr(0≤X≤k)|

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\leq&space;k)&space;&=&space;\sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\leq&space;k)&space;&=&space;\sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!}&space;\end{align*}" title="\begin{align*} Pr(X=k) &= \frac{\lambda^ke^{-\lambda}}{k!} \\ Pr(X\leq k) &= \sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!} \end{align*}" /></a>

### Supplementary Functions

|function name|description|
|:-:|:--|
|`fact(n)`|calculate factorial n! , `n` must be integer|
|`round(num, decimal=0)`|same as Python function `round()`|
|`Euler_const`|Euler's constant γ = 0.5772156649015328606|
|`gamma(x, delta=1e-4, max_iter=1e7)`|calculate Γ(x) = (x-1)! with Weierstrass's definition (may be not as precise as [Double Exponential](https://en.wikipedia.org/wiki/Tanh-sinh_quadrature))|








