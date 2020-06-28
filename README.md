# JS_mathtool

JavaScript functions for mathematic calculations. Please feel free to use them.

**"not very precise, but simple and fast enough"** (guarantee at least 5 significant digits)


Demo https://nozomiyamada.github.io/tool.html

_note_: All codes have no exception handling (e.g. checking integer). You should be careful when you use them, or implement by yourself.

- `gcd_lcm.js` functions for calculating GCD(ห.ร.ม) and LCM(ค.ร.น)
- `statistics.js` functions for numeric analisys and statistics
- `misc.js` other various functions

# `gcd_lcm.js`

|function name|description|
|:-:|:--|
|`gcd2(a,b)`|calculate GCD of two positive integers `a` and `b` by Euclidean Algorithm|
|`gcd(nums)`|calculate GCD of all integers in array `nums`|
|`lcm2(a,b)`|calculate LCM of two positive integers `a` and `b` by using equation `a*b=GCD*LCM`|
|`lcm(nums)`|calculate LCM of all integers in array `nums`|

# `statistics.js`

## numeric analysis

|function name|description|
|:-:|:--|
|`gauss_legendre(a,b,func,split=1000,n=5)`|calculate ∫[a->b]f(x)dx by [Gauss-Legendre quadrature](https://en.wikipedia.org/wiki/Gaussian_quadrature) of n-th Legendre polynomial. `func` must be an explicit function that takes only one argument like f(x). `split` determines the number of intervals in the range of integration|
|`newton(y,x0,func,func_prime,iter=15)`|solve the equation y = f(x) by using [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method). `func` and `func_prime` (derivative of `func`) must be explicit functions that take only one argument like f(x), f'(x). `x0` is an initial guess for x. You can set iteration times `iter`.|
|`brent(y,a0,b0,func,iter=100,epsiron=1e-15)`|solve the equation y = f(x) by using [Brent's method](https://en.wikipedia.org/wiki/Brent%27s_method). `func` must be an explicit function that takes only one argument like f(x). `a0` and `b0` are initial guess for x. These two numbers must have opposite sign, otherwise the function will return `null`. You can set maximum iteration times `iter` and minimum width of step `epsiron` in each iteration.|


~~~javascript
>>> fx = function(x){return x**2};
>>> gauss_legendre(0,3,fx);
3

>>> f = function(x){return x**2+1};
>>> fprime = function(x){return 2*x};
>>> newton(10,1,f,fprime);
3

>>> f = function(x){return x**3};
>>> brent(8,-1,6,f);
3
~~~

Both `newton` and `brent` will abort the process when error is below 1e-15 and output the total iteration times on the console.

> Gauss-Legendre quadrature

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;\int_a^bf(x)dx&space;&=&space;\frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t&plus;\frac{a&plus;b}{2}\right)dt\\&space;&\sim&space;\frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i&plus;\frac{a&plus;b}{2}\right)\\&space;&\text{where&space;$t_i$&space;is&space;the&space;i-th&space;zero&space;point&space;of&space;Legendre&space;polynomial}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;\int_a^bf(x)dx&space;&=&space;\frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t&plus;\frac{a&plus;b}{2}\right)dt\\&space;&\sim&space;\frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i&plus;\frac{a&plus;b}{2}\right)\\&space;&\text{where&space;$t_i$&space;is&space;the&space;i-th&space;zero&space;point&space;of&space;Legendre&space;polynomial}&space;\end{align*}" title="\begin{align*} \int_a^bf(x)dx &= \frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t+\frac{a+b}{2}\right)dt\\ &\sim \frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i+\frac{a+b}{2}\right)\\ &\text{where $t_i$ is the i-th zero point of Legendre polynomial} \end{align*}" /></a>


> Newton's Method

<a href="https://www.codecogs.com/eqnedit.php?latex=x_{n&plus;1}&space;=&space;x_n&space;&plus;&space;\frac{y-f(x_n)}{f'(x_n)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?x_{n&plus;1}&space;=&space;x_n&space;&plus;&space;\frac{y-f(x_n)}{f'(x_n)}" title="x_{n+1} = x_n + \frac{y-f(x_n)}{f'(x_n)}" /></a>


## normal distribution

![z_to_p](https://user-images.githubusercontent.com/44984892/85935209-7dd9c980-b918-11ea-9763-b93469034964.png)

|function name|description|
|:-:|:--|
|`z_to_p(z, N=100)`|calculate one-tailed p(z≤x) from `z` score by Taylor expansion up to `N`-th order|
|`p_to_z(p, iter=20)`|calculate z-score from one-tailed `p`(z≤x) by `iter` times iterations of Newton's Method|
|`p_to_z2(p, N=300)`|calculate z-score from one-tailed `p`(z≤x) by Taylor expansion up to `N`-th order|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(z&space;\leq&space;x)&space;&=&space;\frac{1}{2}&space;-&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{2}~{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&\sim&space;\frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(z&space;\leq&space;x)&space;&=&space;\frac{1}{2}&space;-&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{2}~{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&\sim&space;\frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" title="\begin{align*} p(z \leq x) &= \frac{1}{2} - \frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx \\ &= \frac{1}{2}-\frac{1}{2}~{\rm erf}(z/\sqrt{2}) \\ &\sim \frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{N}\frac{z/\sqrt{2}}{2n+1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k} \end{align*}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;z(p)&space;&=&space;\sqrt{2}~{\rm&space;erf}^{-1}(2p)&space;\\&space;&\sim&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}(\sqrt{\pi}p)^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;z(p)&space;&=&space;\sqrt{2}~{\rm&space;erf}^{-1}(2p)&space;\\&space;&\sim&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}(\sqrt{\pi}p)^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" title="\begin{align*} z(p) &= \sqrt{2}~{\rm erf}^{-1}(2p) \\ &\sim \sum_{n=0}^{N}\frac{C_k}{2k+1}(\sqrt{\pi}p)^{2k+1} \\ &\text{where}~C_k = \sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m+1)(2m+1)} \end{align*}" /></a>

## t-distribution

![t_to_p](https://user-images.githubusercontent.com/44984892/85932777-56bfcf80-b8f9-11ea-8f52-9b1172462bf6.png)

|function name|description|
|:-:|:--|
|`t_to_p(t, df)`|calculate one-tailed p-value from given `t` score and `df` by incomplete beta function|
|`p_to_t(p, df)`|calculate t-score from one-tailed `p` value and `df` by 10 times iterations of Newton's Method|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(t,df)&space;&=&space;1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)}&space;\\&space;&\text{where}~x&space;=\frac{t&plus;\sqrt{t^2&plus;df}}{2\sqrt{t^2&plus;df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(t,df)&space;&=&space;1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)}&space;\\&space;&\text{where}~x&space;=\frac{t&plus;\sqrt{t^2&plus;df}}{2\sqrt{t^2&plus;df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}}&space;\end{align*}" title="\begin{align*} p(t,df) &= 1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)} \\ &\text{where}~x =\frac{t+\sqrt{t^2+df}}{2\sqrt{t^2+df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}} \end{align*}" /></a>

## F-distribution

![f_to_p](https://user-images.githubusercontent.com/44984892/85934703-0d7b7a00-b911-11ea-84cb-e940fc5630d9.png)

|function name|description|
|:-:|:--|
|`f_to_p(F, df1, df2)`|calculate one-tailed p-value from given `F` value and `df1``df2` by incomplete beta function|
|`p_to_f(p, df1, df2)`|calculate F-value from one-tailed `p` value and `df1``df2` by 10 times iterations of Newton's Method|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(f,df_1,df_2)&space;&=&space;1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)}&space;\\&space;&\text{where}~x&space;=\frac{df_1f}{df_1f&plus;df_2}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(f,df_1,df_2)&space;&=&space;1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)}&space;\\&space;&\text{where}~x&space;=\frac{df_1f}{df_1f&plus;df_2}&space;\end{align*}" title="\begin{align*} p(f,df_1,df_2) &= 1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)} \\ &\text{where}~x =\frac{df_1f}{df_1f+df_2} \end{align*}" /></a>

## Poisson distribution

![poisson](https://user-images.githubusercontent.com/44984892/85938399-4d555800-b937-11ea-9016-ce6549dfc131.png)

|function name|description|
|:-:|:--|
|`poisson(lambda, k)`|calculate Poisson Pr(X=`k`) directly from probability mass function|
|`poisson_cum(lambda, k)`|calculate cumulative Poisson Pr(0≤X≤`k`)|

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\leq&space;k)&space;&=&space;\sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\leq&space;k)&space;&=&space;\sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!}&space;\end{align*}" title="\begin{align*} Pr(X=k) &= \frac{\lambda^ke^{-\lambda}}{k!} \\ Pr(X\leq k) &= \sum_{n=0}^{k}\frac{\lambda^ne^{-\lambda}}{n!} \end{align*}" /></a>

## supplementary functions

|function name|description|
|:-:|:--|
|`fact(n)`|calculate factorial n! , `n` must be an integer|
|`round(num,decimal=0)`|same as the Python function `round()`|
|`Euler_const`|Euler's constant γ = 0.5772156649015328606|
|`gamma(s,split=1e3,n=5)`|calculate Γ(s) = (s-1)! by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`gamma2(s,N=1e6)`|calculate Γ(s) = (s-1)! by Weierstrass's definition up to N-th order (slower and less precise than `gamma`)|
|`incomplete_gamma(s,x,split=1e3,n=5)`|calculate lower incomplete gamma function γ(s,x) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`beta(a,b,split=1e3,n=5)`|calculate beta function B(a,b) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`incomplete_beta(a,b,x,split=1e3,n=5)`|calculate beta function B(x;a,b) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`sigmoid(x)`|calculate sigmoid function|


> gamma function

<a href="https://www.codecogs.com/eqnedit.php?latex=\Gamma(s)&space;=&space;(s-1)!&space;=&space;\int_0^{\infty}&space;t^{s-1}e^{-t}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Gamma(s)&space;=&space;(s-1)!&space;=&space;\int_0^{\infty}&space;t^{s-1}e^{-t}dt" title="\Gamma(s) = (s-1)! = \int_0^{\infty} t^{s-1}e^{-t}dt" /></a>

> Weierstrass's definition

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;\frac{1}{\Gamma(s)}&space;&=&space;se^{\gamma&space;s}\prod_{m=1}^{\infty}(1&plus;\frac{s}{m})e^{-s/m}&space;\\&space;-\log\Gamma(s)&space;&\sim&space;\log&space;s&plus;\gamma&space;s&space;&plus;&space;\sum_{m=1}^{N}\left(\log(1&plus;\frac{s}{m})-\frac{s}{m}\right)&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;\frac{1}{\Gamma(s)}&space;&=&space;se^{\gamma&space;s}\prod_{m=1}^{\infty}(1&plus;\frac{s}{m})e^{-s/m}&space;\\&space;-\log\Gamma(s)&space;&\sim&space;\log&space;s&plus;\gamma&space;s&space;&plus;&space;\sum_{m=1}^{N}\left(\log(1&plus;\frac{s}{m})-\frac{s}{m}\right)&space;\end{align*}" title="\begin{align*} \frac{1}{\Gamma(s)} &= se^{\gamma s}\prod_{m=1}^{\infty}(1+\frac{s}{m})e^{-s/m} \\ -\log\Gamma(s) &\sim \log s+\gamma s + \sum_{m=1}^{N}\left(\log(1+\frac{s}{m})-\frac{s}{m}\right) \end{align*}" /></a>

> lower imcomplete gamma function

<a href="https://www.codecogs.com/eqnedit.php?latex=\gamma(s,x)&space;=&space;\int_0^x&space;t^{s-1}e^{-t}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\gamma(s,x)&space;=&space;\int_0^x&space;t^{s-1}e^{-t}dt" title="\gamma(s,x) = \int_0^x t^{s-1}e^{-t}dt" /></a>

> beta function

<a href="https://www.codecogs.com/eqnedit.php?latex=B(a,b)&space;=&space;\int_0^1&space;t^{a-1}(1-t)^{b-1}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?B(a,b)&space;=&space;\int_0^1&space;t^{a-1}(1-t)^{b-1}dt" title="B(a,b) = \int_0^1 t^{a-1}(1-t)^{b-1}dt" /></a>

> incomplete beta function

<a href="https://www.codecogs.com/eqnedit.php?latex=B(x;a,b)&space;=&space;\int_0^x&space;t^{a-1}(1-t)^{b-1}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?B(x;a,b)&space;=&space;\int_0^x&space;t^{a-1}(1-t)^{b-1}dt" title="B(x;a,b) = \int_0^x t^{a-1}(1-t)^{b-1}dt" /></a>

> sigmoid function

<a href="https://www.codecogs.com/eqnedit.php?latex=S(x)&space;=&space;\frac{1}{1&plus;e^{-x}}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?S(x)&space;=&space;\frac{1}{1&plus;e^{-x}}" title="S(x) = \frac{1}{1+e^{-x}}" /></a>


## `misc.js`

|function name|description|
|:-:|:--|
|`convert_base(num, base_from, base_to)`|convert base|


