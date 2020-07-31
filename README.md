# JS_mathtool

JavaScript functions for mathematic calculations that don't require any background programs. Please feel free to copy and use them. 

**"not very precise, but simple and fast enough"** (guarantee at least 6 significant digits)


Demo https://nozomiyamada.github.io/tool.html

___note___: Some codes have no exception handling (e.g. checking integer). You should be careful when you use them, or implement by yourself. If you want to analyze data on Python (Scipy) or R, you don't have to use my functions at all, because they are more precise and convenient. Or, you can use this instead -> [math.js](https://mathjs.org/)

### .js files

- `math_func.js` numeric analysis methods and math functions e.g. sum, fact, gamma, beta, erf
- `statistics.js` functions for statistics (most of the functions depend `special_func.js`)
- `constants.js` constants used in `statistics.js`
- `gcd_lcm.js` functions for calculating GCD(ห.ร.ม) and LCM(ค.ร.น)
- `misc.js` other various functions



# `math_func.js`

## basic functions

<details>

|function name|description|
|:-:|:--|
|`max(matrix)`|find the maximum value in a given array/matrix|
|`min(matrix)`|find the minimum value in a given array/matrix|
|`sum(matrix)`|culculate the summation of a given array/matrix|
|`fact(n)`|calculate factorial n! , `n` must be an integer|
|`check_decimal(num)`|check how many digits a given number has|
|`range(start, end, step=1)`|just like `range(start, end, step)` in Python. `step` must not be an integer|
|`round(arr, decimal=0)`|just like `round(num, d)` in Python. If an array is given, it rounds all numbers in the array.|
|`zip(...arr)`|just like `zip(*arr)` in Python. The length of return array is the minimum length of the given arrays.|
|`sorted(arr, reverse=false)`|just like `sorted()` in Python. It returns a deep copy of the original array|
|`argsort(arr, reverse=false, plus1=false)`|return array of indices after sorting by ascending order. If `plus1=true`, index starts from one|

~~~javascript
>>> check_decimal(3.66)
2

>>> range(3)
[0, 1, 2]

>>> range(3, 8)
[3, 4, 5, 6, 7]

>>> range(1, 2, 0.1)
[1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9]

>>> round(3.5)
3

>>> round(4.666, 2)
4.67

>>> round([1.32, 2.37], 1)
[1.3, 2.4]

>>> zip([1,2,3], [10,20,30,40])
[[1, 10], [2, 20], [3, 30]]

>>> argsort([10,1,5,0])
[3, 1, 2, 0]

>>> argsort([3,1,2], reverse=true, plus1=true)
[1, 3, 2]
~~~

</details>

## tensor operations

<details>

|function name|description|
|:-:|:--|
|`norm(arr)`|calculate norm of a given vector|
|`vec_add(arr1, arr2, subtract=false)`|calculate addition of given two vector. If `subtract=true`, calculate subtraction instead|
|`flatten(tensor)`|flatten a given tensor into 1D array|
|`shape(tensor)`|return the shape of a given tensor, just like `.shape` of numpy|
|`cartesian(arr1, arr2, func_xy=(x,y)=>[x,y])`|create the cartesian product of two given arrays. It returns pairs of elements by default, but you can specify operation by `func_xy`|
|`deepcopy(tensor)`|make an deep copy of given tensor. If `tensor` is 1D array (vector) or 2D array (matrix), you can use built-in method `.slice()` instead|
|`transpose(matrix)`|transpose a given matrix|
|`zeros(shape, value=0)`|create a zero matrix with `shape` = [l,m,n...], just like `numpy.zeros(shape)`. If `value` is specified, the matrix is filled with the value. |
|`dot1(arr1, arr2)`|calculate dot product of given two vectors|
|`dot2(mat1, mat2)`|calculate dot product of given two matrices|
|`dot(tensor1, tensor2)`|calculate dot product of given two vector/matrix|
|`cofactor(mat, row_delete=0, column_delete=0)`|return cofactor matrix of a given matrix by deleting `row_delete` and `columns_delete`|
|`determinant(mat)`|calculate determinant of a given matrix. It may take a long time for large matrix because the algorithm uses cofactor expansion instead of LU decomposition|
|`inv_matrix(mat)`|calculate inverse matrix of a given matrix|

~~~javascript
>>> norm([3,4])
5

>>> vec_add([1,2], [3,4])
[4, 6]

>>> flatten([[[1,2],[3,4]],[[5,6],[7,8]]])
[1, 2, 3, 4, 5, 6, 7, 8]

>>> shape([[[1,1,1],[2,2,2]],[[3,3,3],[4,4,4]]])
[2, 2, 3]

>>> cartesian([1,2], [3,4])
[[[1,3], [1,4]], [[2,3], [2,4]]]

>>> cartesian(['A','B'], ['a','b'], (x,y) => x+y)
[['Aa', 'Ab'], ['Ba', 'Bb']]

>>> zeros([2,3])
[[0, 0, 0], [0, 0, 0]]

>>> zeros([2,2], 3)
[[3, 3], [3, 3]]
~~~

</details>

## numeric analysis

<details>

|function name|description|
|:-:|:--|
|`gauss_legendre(func,a,b,split=1000,n=5)`|calculate ∫[a->b]f(x)dx by [Gauss-Legendre quadrature](https://en.wikipedia.org/wiki/Gaussian_quadrature) of n-th Legendre polynomial. `func` must be an explicit function that takes only one argument like f(x). `split` determines the number of intervals in the range of integration|
|`newton(func,func_prime,y,x0,iter=15)`|solve the equation y = f(x) by using [Newton's method](https://en.wikipedia.org/wiki/Newton%27s_method). `func` and `func_prime` (derivative of `func`) must be explicit functions that take only one argument like f(x), f'(x). `x0` is an initial guess for x. You can set iteration times `iter`.|
|`brent(func,y,a0,b0,iter=100,epsiron=1e-15)`|solve the equation y = f(x) by using [Brent's method](https://en.wikipedia.org/wiki/Brent%27s_method). `func` must be an explicit function that takes only one argument like f(x). `a0` and `b0` are initial guess for x. These two numbers must have opposite sign, otherwise the function will return `NaN`. You can set maximum iteration times `iter` and minimum width of step `epsiron` in each iteration.|

~~~javascript
>>> fx = x => x**2;
>>> gauss_legendre(fx, a=0, b=3);
3

>>> f = x => x**2+1;
>>> fprime = x => 2*x;
>>> newton(f, fprime, y=10, x0=1);
3

>>> f = x => x**3;
>>> brent(f, y=8, a0=-1, b0=6);
2
~~~

Both `newton` and `brent` will abort the process when error is below **1e-12** and output the total iteration times on the console.

> Gauss-Legendre quadrature

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;\int_a^bf(x)dx&space;&=&space;\frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t&plus;\frac{a&plus;b}{2}\right)dt\\&space;&\sim&space;\frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i&plus;\frac{a&plus;b}{2}\right)\\&space;&\text{where&space;$t_i$&space;is&space;the&space;i-th&space;zero&space;point&space;of&space;Legendre&space;polynomial}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;\int_a^bf(x)dx&space;&=&space;\frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t&plus;\frac{a&plus;b}{2}\right)dt\\&space;&\sim&space;\frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i&plus;\frac{a&plus;b}{2}\right)\\&space;&\text{where&space;$t_i$&space;is&space;the&space;i-th&space;zero&space;point&space;of&space;Legendre&space;polynomial}&space;\end{align*}" title="\begin{align*} \int_a^bf(x)dx &= \frac{b-a}{2}\int_{-1}^1f\left(\frac{b-a}{2}t+\frac{a+b}{2}\right)dt\\ &\sim \frac{b-a}{2}\sum_{i=1}^{n}\left(\frac{b-a}{2}t_i+\frac{a+b}{2}\right)\\ &\text{where $t_i$ is the i-th zero point of Legendre polynomial} \end{align*}" /></a>

> Newton's Method

<a href="https://www.codecogs.com/eqnedit.php?latex=x_{n&plus;1}&space;=&space;x_n&space;&plus;&space;\frac{y-f(x_n)}{f'(x_n)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?x_{n&plus;1}&space;=&space;x_n&space;&plus;&space;\frac{y-f(x_n)}{f'(x_n)}" title="x_{n+1} = x_n + \frac{y-f(x_n)}{f'(x_n)}" /></a>

</details>


## Gauss error function

<details>

|function name|description|
|:-:|:--|
|`erf(z,split=1e3,n=5)`|calculate Gauss error function y = erf(z) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`erfc(z,split=1e3,n=5)`|calculate complementary error function y = erfc(z) = 1 - erf(z) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`inv_erf(y,iter=30)`|calculate inverse error function z = ierf(y) by Newton's Method (initial x<sub>0</sub>  is selected automatically)|
|`erf2(z, N=100)`|calculate Gauss error function y = erf(z) by Taylor expansion up to `N`-th order|
|`inv_erf2(y, N=300)`|calculate inverse error function z = ierf(y) by Taylor expansion up to `N`-th order|

> Gauss error function

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;{\rm&space;erf}(z)&space;&=&space;\frac{2}{\sqrt{\pi}}\int_{0}^{z}e^{-t^2}dt&space;\\&space;&=&space;\frac{2}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z}{2n&plus;1}\prod_{k=1}^{n}\frac{-z^2}{k}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;{\rm&space;erf}(z)&space;&=&space;\frac{2}{\sqrt{\pi}}\int_{0}^{z}e^{-t^2}dt&space;\\&space;&=&space;\frac{2}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z}{2n&plus;1}\prod_{k=1}^{n}\frac{-z^2}{k}&space;\end{align*}" title="\begin{align*} {\rm erf}(z) &= \frac{2}{\sqrt{\pi}}\int_{0}^{z}e^{-t^2}dt \\ &= \frac{2}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z}{2n+1}\prod_{k=1}^{n}\frac{-z^2}{k} \end{align*}" /></a>

> inverse error function

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;{\rm&space;erf}^{-1}(y)&space;&=&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}(\frac{\sqrt{\pi}}{2}y)^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;{\rm&space;erf}^{-1}(y)&space;&=&space;\sum_{n=0}^{N}\frac{C_k}{2k&plus;1}(\frac{\sqrt{\pi}}{2}y)^{2k&plus;1}&space;\\&space;&\text{where}~C_k&space;=&space;\sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m&plus;1)(2m&plus;1)}&space;\end{align*}" title="\begin{align*} {\rm erf}^{-1}(y) &= \sum_{n=0}^{N}\frac{C_k}{2k+1}(\frac{\sqrt{\pi}}{2}y)^{2k+1} \\ &\text{where}~C_k = \sum_{m=0}^{k-1}\frac{C_mC_{k-1-m}}{(m+1)(2m+1)} \end{align*}" /></a>

</details>


## gamma function

<details>

|function name|description|
|:-:|:--|
|`Euler_const`|Euler's constant γ = 0.5772156649015328606|
|`gamma(s,split=1e3,n=5)`|calculate Γ(s) = (s-1)! by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`incomplete_gamma(s,x,split=1e3,n=5)`|calculate lower incomplete gamma function γ(s,x) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`inv_gamma(y,iter=30)`|calculate inverse gamma s = Γ<sup>-1</sup>(y) by Newton's Method (initial s<sub>0</sub> is selected automatically)|
|`inv_incomplete_gamma(s,y,x0=s,iter=30)`|calculate inverse complete gamma x = γ<sup>-1</sup>(s,y) by Newton's Method (default initial x<sub>0</sub> = s)|
|`gamma2(s,N=1e6)`|calculate Γ(s) = (s-1)! by Weierstrass's definition up to N-th order (slower and less precise than `gamma` if `N` is not enough)|

> gamma function

<a href="https://www.codecogs.com/eqnedit.php?latex=\Gamma(s)&space;=&space;(s-1)!&space;=&space;\int_0^{\infty}&space;t^{s-1}e^{-t}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Gamma(s)&space;=&space;(s-1)!&space;=&space;\int_0^{\infty}&space;t^{s-1}e^{-t}dt" title="\Gamma(s) = (s-1)! = \int_0^{\infty} t^{s-1}e^{-t}dt" /></a>

> lower imcomplete gamma function

<a href="https://www.codecogs.com/eqnedit.php?latex=\gamma(s,x)&space;=&space;\int_0^x&space;t^{s-1}e^{-t}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\gamma(s,x)&space;=&space;\int_0^x&space;t^{s-1}e^{-t}dt" title="\gamma(s,x) = \int_0^x t^{s-1}e^{-t}dt" /></a>

> Weierstrass's definition

<a href="https://www.codecogs.com/eqnedit.php?latex=\dpi{120}&space;\begin{align*}&space;\frac{1}{\Gamma(s)}&space;&=&space;se^{\gamma&space;s}\prod_{m=1}^{\infty}(1&plus;\frac{s}{m})e^{-s/m}&space;\\&space;-\log\Gamma(s)&space;&\sim&space;\log&space;s&plus;\gamma&space;s&space;&plus;&space;\sum_{m=1}^{N}\left(\log(1&plus;\frac{s}{m})-\frac{s}{m}\right)&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\dpi{120}&space;\begin{align*}&space;\frac{1}{\Gamma(s)}&space;&=&space;se^{\gamma&space;s}\prod_{m=1}^{\infty}(1&plus;\frac{s}{m})e^{-s/m}&space;\\&space;-\log\Gamma(s)&space;&\sim&space;\log&space;s&plus;\gamma&space;s&space;&plus;&space;\sum_{m=1}^{N}\left(\log(1&plus;\frac{s}{m})-\frac{s}{m}\right)&space;\end{align*}" title="\begin{align*} \frac{1}{\Gamma(s)} &= se^{\gamma s}\prod_{m=1}^{\infty}(1+\frac{s}{m})e^{-s/m} \\ -\log\Gamma(s) &\sim \log s+\gamma s + \sum_{m=1}^{N}\left(\log(1+\frac{s}{m})-\frac{s}{m}\right) \end{align*}" /></a>

</details>


## beta function

<details>

|function name|description|
|:-:|:--|
|`beta(a,b,split=1e3,n=5)`|calculate beta function B(a,b) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`incomplete_beta(a,b,x,split=1e3,n=5)`|calculate incomplete beta function B(x;a,b) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`regularized_beta(a,b,x,split=1e3,n=5)`|calculate regularized incomplete beta function y = I<sub>x</sub>(a,b) = B(x;a,b)/B(a,b) by Gauss-Legendre quadrature of n-th Legendre polynomial|
|`inv_regularized_beta(a,b,y,iter=30)`|calculate inverse regularized incomplete x = I<sup>-1</sup>(y;a,b) by Newton's Method (initial x<sub>0</sub>  is selected automatically)|

> beta function

<a href="https://www.codecogs.com/eqnedit.php?latex=B(a,b)&space;=&space;\int_0^1&space;t^{a-1}(1-t)^{b-1}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?B(a,b)&space;=&space;\int_0^1&space;t^{a-1}(1-t)^{b-1}dt" title="B(a,b) = \int_0^1 t^{a-1}(1-t)^{b-1}dt" /></a>

> incomplete beta function

<a href="https://www.codecogs.com/eqnedit.php?latex=B(x;a,b)&space;=&space;\int_0^x&space;t^{a-1}(1-t)^{b-1}dt" target="_blank"><img src="https://latex.codecogs.com/gif.latex?B(x;a,b)&space;=&space;\int_0^x&space;t^{a-1}(1-t)^{b-1}dt" title="B(x;a,b) = \int_0^x t^{a-1}(1-t)^{b-1}dt" /></a>

> regularized incomplete beta function

<a href="https://www.codecogs.com/eqnedit.php?latex=I_x(a,b)&space;=&space;\frac{B(x;a,b)}{B(a,b)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?I_x(a,b)&space;=&space;\frac{B(x;a,b)}{B(a,b)}" title="I_x(a,b) = \frac{B(x;a,b)}{B(a,b)}" /></a>

</details>


## supplementary functions

|function name|description|
|:-:|:--|
|`sigmoid(x)`|calculate sigmoid function|
|`combination(n,k)`|calculate combinations C(n,k)|
|`permutation(n,k)`|calculate permutations P(n,k)|

> sigmoid function

<a href="https://www.codecogs.com/eqnedit.php?latex=S(x)&space;=&space;\frac{1}{1&plus;e^{-x}}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?S(x)&space;=&space;\frac{1}{1&plus;e^{-x}}" title="S(x) = \frac{1}{1+e^{-x}}" /></a>



# `statistics.js`

## statistics values

<details>

|function name|description|
|:-:|:--|
|`sum(arr)`|calculate summation of `arr`|
|`mean(arr)`|calculate mean of `arr`|
|`median(arr)`|calculate median of `arr`|
|`variance(arr, unbiased=true)`|calculate unbiased/biased variance of `arr`|
|`std(arr, unbiased=true)`|calculate unbiased/biased standard deviation of `arr`|
|`sem(arr)`|calculate SEM (standard error of mean: s/√n) of `arr`|
|`skewness(arr, regularize=false)`|calculate skewness of `arr`, use equation √(N-1)/(N-2) * sk instead if `regularize==true`|
|`cov(arr1, arr2, unbiased=true)`|calculate covariance from from `arr1` and `arr2`|
|`corr(arr1, arr2)`|calculate Pearson correlation coefficient from from covariance `cov12` and SD `s1` `s2`|
|`corr_arr(arr1, arr2)`|calculate Pearson correlation coefficient from from `arr1` and `arr2`|
|`regression(arr1,arr2)`|calculate `coef` and `intercept` of simple linear regression from from `arr1` and `arr2`|
|`chi2(arr1,arr2,yates=false)`|calculate χ<sup>2</sup> score from `arr1` and `arr2`|
|`chi2_independence(arr1,arr2)`|calculate χ<sup>2</sup> score of test for independence from `arr1` and `arr2`|
|`welch(mu1,mu2,s1,s2,n1,n2)`|calculate and return the array of [Welch's t-value, df] from mean `mu1` `mu2`, SD `s1` `s2` and sample size `n1` `n2`|
|`welch_arr(arr1, arr2)`|calculate and return the array of [Welch's t-value, df] from `arr1` and `arr2`|
|`effect_size(arr1, arr2)`|calculate Cohens' d from `arr1` and `arr2`|

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{sample&space;mean}~~\overline{x}&space;=&space;\frac{1}{n}\sum_i^{n}(x_i-\overline{x})" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{sample&space;mean}~~\overline{x}&space;=&space;\frac{1}{n}\sum_i^{n}(x_i-\overline{x})" title="\text{sample mean}~~\overline{x} = \frac{1}{n}\sum_i^{n}(x_i-\overline{x})" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{unbiased&space;variance}~~V&space;=&space;\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{unbiased&space;variance}~~V&space;=&space;\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2" title="\text{unbiased variance}~~V = \frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{sample&space;SD}~~s&space;=&space;\sqrt{\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{sample&space;SD}~~s&space;=&space;\sqrt{\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2}" title="\text{sample SD}~~s = \sqrt{\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})^2}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{standard&space;error&space;of&space;mean}~~SE&space;=&space;\frac{s}{\sqrt{n}}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{standard&space;error&space;of&space;mean}~~SE&space;=&space;\frac{s}{\sqrt{n}}" title="\text{standard error of mean}~~SE = \frac{s}{\sqrt{n}}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{skewness}~~\tilde{\mu}_3&space;=&space;\frac{1}{n}\sum_i^{n}\left(\frac{x_i-\overline{x}}{s}\right)^3" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{skewness}~~\tilde{\mu}_3&space;=&space;\frac{1}{n}\sum_i^{n}\left(\frac{x_i-\overline{x}}{s}\right)^3" title="\text{skewness}~~\tilde{\mu}_3 = \frac{1}{n}\sum_i^{n}\left(\frac{x_i-\overline{x}}{s}\right)^3" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{unbiased&space;covariance}~~Cov&space;=&space;\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})(y_i-\overline{y})" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{unbiased&space;covariance}~~Cov&space;=&space;\frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})(y_i-\overline{y})" title="\text{unbiased covariance}~~Cov = \frac{1}{n-1}\sum_i^{n}(x_i-\overline{x})(y_i-\overline{y})" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{correlation&space;coefficient}~~\rho_{X,Y}&space;=&space;\frac{Cov_{X,Y}}{s_{X}s_{Y}}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{correlation&space;coefficient}~~\rho_{X,Y}&space;=&space;\frac{Cov_{X,Y}}{s_{X}s_{Y}}" title="\text{correlation coefficient}~~\rho_{X,Y} = \frac{Cov_{X,Y}}{s_{X}s_{Y}}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\text{chi-squared&space;score}~~\chi^2&space;=&space;\sum_i^{n}\frac{(x_i-y_i)^2}{y_i}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\text{chi-squared&space;score}~~\chi^2&space;=&space;\sum_i^{n}\frac{(x_i-y_i)^2}{y_i}" title="\text{chi-squared score}~~\chi^2 = \sum_i^{n}\frac{(x_i-y_i)^2}{y_i}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;&{\rm&space;Cohen's}~d&space;=&space;\frac{\overline{x_2}-\overline{x_1}}{s_c}&space;\\&space;&\text{where}~~s_c&space;=&space;\sqrt{\frac{(n_1-1)s_1^2&plus;(n_2-1)s_2^2}{n_1&plus;n_2-2}}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;&{\rm&space;Cohen's}~d&space;=&space;\frac{\overline{x_2}-\overline{x_1}}{s_c}&space;\\&space;&\text{where}~~s_c&space;=&space;\sqrt{\frac{(n_1-1)s_1^2&plus;(n_2-1)s_2^2}{n_1&plus;n_2-2}}&space;\end{align*}" title="\begin{align*} &{\rm Cohen's}~d = \frac{\overline{x_2}-\overline{x_1}}{s_c} \\ &\text{where}~~s_c = \sqrt{\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}} \end{align*}" /></a>

</details>


## normal distribution

<details>

![z_to_p](https://user-images.githubusercontent.com/44984892/85935209-7dd9c980-b918-11ea-9763-b93469034964.png)

|function name|description|
|:-:|:--|
|`normal_pdf(x, mu=0, sd=1)`|population density function of normal distribution φ(x)|
|`normal_cdf(x, mu=0, sd=1)`|cumulative distribution function of normal distribution Φ(x)|
|`z_to_p(z, taylor=false)`|calculate one-tailed p(z≤x) from `z` score by `erf(z)` (when `taylor==false`) or `erf2(z)` (when `taylor==true`), where z must be in the range [0,∞)|
|`p_to_z(p, taylor=false)`|calculate z-score from one-tailed `p`(z≤x) by `inv_erf(z)` (when `taylor==false`) or `inv_erf2(z)` (when `taylor==true`), where p must be in the range [0,0.5]|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(z&space;\leq&space;x)&space;&=&space;\frac{1}{2}&space;-&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{2}~{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(z&space;\leq&space;x)&space;&=&space;\frac{1}{2}&space;-&space;\frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{2}~{\rm&space;erf}(z/\sqrt{2})&space;\\&space;&=&space;\frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z/\sqrt{2}}{2n&plus;1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k}&space;\end{align*}" title="\begin{align*} p(z \leq x) &= \frac{1}{2} - \frac{1}{\sqrt{2\pi}}\int_{0}^{z}\exp(-x^2/2)dx \\ &= \frac{1}{2}-\frac{1}{2}~{\rm erf}(z/\sqrt{2}) \\ &= \frac{1}{2}-\frac{1}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{z/\sqrt{2}}{2n+1}\prod_{k=1}^{n}\frac{-(z/\sqrt{2})^2}{k} \end{align*}" /></a>

<a href="https://www.codecogs.com/eqnedit.php?latex=z(p)&space;=&space;\sqrt{2}~{\rm&space;erf}^{-1}(1-2p)" target="_blank"><img src="https://latex.codecogs.com/gif.latex?z(p)&space;=&space;\sqrt{2}~{\rm&space;erf}^{-1}(1-2p)" title="z(p) = \sqrt{2}~{\rm erf}^{-1}(1-2p)" /></a>

</details>


## t-distribution

<details>

![t_to_p](https://user-images.githubusercontent.com/44984892/86042285-20a55b80-ba71-11ea-9565-dd276dfb9add.png)

|function name|description|
|:-:|:--|
|`t_to_p(t, df)`|calculate one-tailed p-value from given `t` score and `df` by `regularized_beta`|
|`p_to_t(p, df)`|calculate t-score from one-tailed `p` value and `df` by `inv_regularized_beta`|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(t,df)&space;&=&space;\int_t^{\infty}\frac{\Gamma((df&plus;1)/2)}{\sqrt{df\cdot\pi}~\Gamma(df/2)}\left(1&plus;\frac{s^2}{df}\right)^{-\frac{df&plus;1}{2}}ds\\&space;&=&space;1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)}&space;\\&space;&\text{where}~x&space;=\frac{t&plus;\sqrt{t^2&plus;df}}{2\sqrt{t^2&plus;df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(t,df)&space;&=&space;\int_t^{\infty}\frac{\Gamma((df&plus;1)/2)}{\sqrt{df\cdot\pi}~\Gamma(df/2)}\left(1&plus;\frac{s^2}{df}\right)^{-\frac{df&plus;1}{2}}ds\\&space;&=&space;1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)}&space;\\&space;&\text{where}~x&space;=\frac{t&plus;\sqrt{t^2&plus;df}}{2\sqrt{t^2&plus;df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}}&space;\end{align*}" title="\begin{align*} p(t,df) &= \int_t^{\infty}\frac{\Gamma((df+1)/2)}{\sqrt{df\cdot\pi}~\Gamma(df/2)}\left(1+\frac{s^2}{df}\right)^{-\frac{df+1}{2}}ds\\ &= 1-\frac{B(x;df/2,df/2)}{B(df/2,df/2)} \\ &\text{where}~x =\frac{t+\sqrt{t^2+df}}{2\sqrt{t^2+df}},~t=\sqrt{\frac{(2x-1)^2df}{4x(1-x)}} \end{align*}" /></a>

</details>


## χ<sup>2</sup>-distribution 

<details>

![chi2_to_p](https://user-images.githubusercontent.com/44984892/86042339-36b31c00-ba71-11ea-9970-de2dc4494166.png)

|function name|description|
|:-:|:--|
|`chi_to_p(chi, df)`|calculate one-tailed p-value from given χ<sup>2</sup> score `chi` and `df` by `gamma`|
|`p_to_chi(p, df)`|calculate χ<sup>2</sup> score from one-tailed `p` value and `df` by `incomplete_gamma` and `gamma`|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(x,df)&space;&=&space;\int_x^{\infty}\frac{1}{2^{k/2}~\Gamma(k/2)}t^{\frac{k}{2}-1}e^{-\frac{k}{2}}dt\\&space;&=&space;1-\frac{\gamma(k/2,x/2)}{\Gamma(k/2)}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(x,df)&space;&=&space;\int_x^{\infty}\frac{1}{2^{k/2}~\Gamma(k/2)}t^{\frac{k}{2}-1}e^{-\frac{k}{2}}dt\\&space;&=&space;1-\frac{\gamma(k/2,x/2)}{\Gamma(k/2)}&space;\end{align*}" title="\begin{align*} p(x,df) &= \int_x^{\infty}\frac{1}{2^{k/2}~\Gamma(k/2)}t^{\frac{k}{2}-1}e^{-\frac{k}{2}}dt\\ &= 1-\frac{\gamma(k/2,x/2)}{\Gamma(k/2)} \end{align*}" /></a>

</details>


## F-distribution

<details>

![f_to_p](https://user-images.githubusercontent.com/44984892/86042311-27cc6980-ba71-11ea-91ba-62a609cfdab7.png)

|function name|description|
|:-:|:--|
|`f_to_p(F, df1, df2)`|calculate one-tailed p-value from given `F` value and `df1` `df2` by `regularized_beta`|
|`p_to_f(p, df1, df2)`|calculate F-value from one-tailed `p` value and `df1` `df2` by `inv_regularized_beta`|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;p(f,df_1,df_2)&space;&=&space;1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)}&space;\\&space;&\text{where}~x&space;=\frac{df_1f}{df_1f&plus;df_2}&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;p(f,df_1,df_2)&space;&=&space;1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)}&space;\\&space;&\text{where}~x&space;=\frac{df_1f}{df_1f&plus;df_2}&space;\end{align*}" title="\begin{align*} p(f,df_1,df_2) &= 1-\frac{B(x;df_1/2,df_2/2)}{B(df_1/2,df_2/2)} \\ &\text{where}~x =\frac{df_1f}{df_1f+df_2} \end{align*}" /></a>

</details>


## Poisson distribution

<details>

![poisson](https://user-images.githubusercontent.com/44984892/86042353-3ca8fd00-ba71-11ea-8fee-43599b84ec6f.png)

|function name|description|
|:-:|:--|
|`poisson(lambda, k)`|calculate Poisson Pr(`k`) directly from probability mass function (if `k` in not an integer, use gamma function Γ(k+1) instead of factorial k!)|
|`poisson_cum(lambda, k)`|calculate cumulative Poisson Pr(`k`≤X)|
|`poisson_to_p(lambda, k, split=100)`|calculate p(`k`≤X) by assuming the distribution is continuous (it may take a little time to finishing calculate)|

<a href="https://www.codecogs.com/eqnedit.php?latex=\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\geq&space;k)&space;&=&space;\sum_{n=k}^{\infty}\frac{\lambda^ne^{-\lambda}}{n!}&space;\\&space;p(X\geq&space;k)&space;&=&space;\int_{k}^{\infty}\frac{\lambda^te^{-\lambda}}{\Gamma(t&plus;1)}dt&space;\end{align*}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;Pr(X=k)&space;&=&space;\frac{\lambda^ke^{-\lambda}}{k!}&space;\\&space;Pr(X\geq&space;k)&space;&=&space;\sum_{n=k}^{\infty}\frac{\lambda^ne^{-\lambda}}{n!}&space;\\&space;p(X\geq&space;k)&space;&=&space;\int_{k}^{\infty}\frac{\lambda^te^{-\lambda}}{\Gamma(t&plus;1)}dt&space;\end{align*}" title="\begin{align*} Pr(X=k) &= \frac{\lambda^ke^{-\lambda}}{k!} \\ Pr(X\geq k) &= \sum_{n=k}^{\infty}\frac{\lambda^ne^{-\lambda}}{n!} \\ p(X\geq k) &= \int_{k}^{\infty}\frac{\lambda^te^{-\lambda}}{\Gamma(t+1)}dt \end{align*}" /></a>

</details>

# `gcd_lcm.js`

|function name|description|
|:-:|:--|
|`gcd2(a,b)`|calculate GCD of two positive integers `a` and `b` by Euclidean Algorithm|
|`gcd(arr)`|calculate GCD of all integers in array `arr`|
|`lcm2(a,b)`|calculate LCM of two positive integers `a` and `b` by using equation `a*b=GCD*LCM`|
|`lcm(arr)`|calculate LCM of all integers in array `arr`|


## `misc.js`

|function name|description|
|:-:|:--|
|`convert_base(num, base_from, base_to)`|convert base|


