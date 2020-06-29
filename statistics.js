////////// basic functions /////////

// factorial, n must be interger
function fact(n){
  if(n==0){
    return 1;
  }else{
    let product = 1;
    for(i=1;i<=n;i++){product *= i;}
    return product
  }
}

// round() like python
function round(num, decimal=0){
  return Math.round(num * (10**decimal)) / (10**decimal)
}

// sigmoid function
function sigmoid(x){
  return 1/(1+Math.exp(-x))
}



////////// statistics /////////////

/** 
 * function for integrating normal distribution
 * z-score -> one-tailed p (0≤p<0.5)
 * @param {Number} z z-score
 * @param {Int} N order of Taylor expansion
 * @return {Number} probability p(z≤x)
 * p(z≤x) = 1/√(2π)∫[0->z]exp(-x^2/2)dx = 0.5erf(z/√2)
 * ~ 1/√π Σ[n:0->N](z/√2)/(2n+1) Π[k:1->n]-(z/√2)^2/k
 * N=100 is default. if z<5, it is enough to set N~50
 */
function z_to_p(z, N=100){
  var z = z/(2**0.5);
  let sum = 0;
  for(var n=0;n<=N;n++){ // Σ
    var product = 1;
    for(var k=1;k<=n;k++){ // Π
      product *= -z*z/k;
    }
    sum += (z * product / (2*n+1));
  }
  return 0.5 - (sum / Math.PI**0.5)
}
/**
 * inverse normal distribution (p -> z-score)
 * @param {*} p p-value = 1/2 - CDF[0->z]
 * use Newton's method
 * 1/2-p = 0.5erf(z/√2π) = 1/√2π∫[0->z]e^(-X^2/2)dX
 * start from X = 1
 * X_new = X + (y-f(X))/f'(X)
 * final X = z
 * z = √(2x-1)^2df/4x(1-x)
 */
function p_to_z(p, iter=20){
  let x = 1;
  for(var i=0;i<iter;i++){
    dif = -Math.exp(-1*x*x/2)/Math.sqrt(2*Math.PI);
    x += (p-z_to_p(x)) / dif;
  }
  return x
}
/**
 * inverse normal distribution 2 
 * one-tailed p (0≤p<0.5) -> z-score
 * @param {Number} p probability p(z≤x)
 * @param {Int} N order of Taylor expansion
 * @return {Number} z-score
 * z = ierf(2p)*√2
 * ~ Σ[n:0->N]Ck/(2k+1) (p√π)^(2K+1)
 * where Ck = Σ[m:0->k-1] C[m]C[k-1-m]/(m+1)(2m+1)
 * N=300 is default. it is enough for p < 0.475
 * if p > 0.499, this approx is not precise because ierf will diverge
 */
function p_to_z2(p, N=300){
  // aray of coef Ck
  let Ck = [1]; 
  for(var k=1;k<=N;k++){
    var s=0;
    for(var m=0;m<k;m++){
      s += Ck[m]*Ck[k-1-m]/(m+1)/(2*m+1);
    }
    Ck.push(s);
  }
  // taylor series
  let total = 0;
  for(let k=0;k<=N;k++){
    total += Ck[k]/(2*k+1) * ((Math.PI)**0.5 * p)**(2*k+1);
  }
  return total*(2**0.5)
}


/**
 * t-distribution
 * @param {Number} t t-score 
 * @param {Number} df degree of freedom
 */
function t_to_p(t,df){
  let x = (t+Math.sqrt(t**2+df))/(2*Math.sqrt(t**2+df));
  return 1-incomplete_beta(df/2,df/2,x)/beta(df/2,df/2)
}
/**
 * inverse t-distribution
 * @param {*} p p-value = 1 - CDF
 * @param {*} df degree of freedom
 * use Newton's method
 * B(df/2,df/2)*(1-p) = B(x;df/2,df/2) = ∫[0->x]X^(df/2-1)(1-X)^(df/2-1)dX
 * start from X = 0.5
 * X_new = X + (y-f(X))/f'(X)
 * final s = x
 * t = √(2x-1)^2df/4x(1-x)
 */
function p_to_t(p,df){
  let y = beta(df/2,df/2)*(1-p); // target y
  let x = 0.5;
  for(var i=0;i<10;i++){
    x += (y-incomplete_beta(df/2,df/2,x))/(Math.pow(x,df/2-1)*Math.pow(1-x,df/2-1))
  }
  return (2*x-1)/2*Math.sqrt(df/x/(1-x))
}

/**
 * F-distribution
 * @param {Number} t t-score 
 * @param {Number} df1 degree of freedom 1
 * @param {Number} df2 degree of freedom 1
 * x = df1*f / (df1*f+df2)
 */
function f_to_p(f, df1, df2){
  let x = df1*f/(df1*f+df2);
  return 1-incomplete_beta(df1/2,df2/2,x)/beta(df1/2,df2/2)
}
/**
 * inverse F-distribution
 * @param {Number} p p-value = 1 - CDF < 0.5
 * @param {Number} df1 degree of freedom
 * @param {Number} df2 degree of freedom
 * use Newton's method
 * B(df1/2,df2/2)*(1-p) = B(x;df1/2,df2/2) = ∫[0->x]X^(df1/2-1)(1-X)^(df2/2-1)dX
 * start from X = 0.5
 * X_new = X + (y-f(X))/f'(X)
 * final s = x
 * f = df2*x/df1(1-x)
 */
function p_to_f(p, df1, df2){
  let y = beta(df1/2,df2/2)*(1-p); // target y
  let x = 0.5;
  for(var i=0;i<10;i++){
    x += (y-incomplete_beta(df1/2,df2/2,x))/(Math.pow(x,df1/2-1)*Math.pow(1-x,df2/2-1))
  }
  return df2*x/(df1*(1-x))
}


/**
 * Poisson Distribution
 * @param {Number} lambda event rate in an interval
 * @param {Int} k the number of times an event occurs in an interval 
 * @return {Number} probability P(X=k)
 */
function poisson(lambda, k){
  return (lambda**k) * (Math.exp(-lambda)) / fact(k)
}
function poisson_cum(lambda, k){
  let sum = 0;
  for(var i=0;i<=k;i++){
    sum += poisson(lambda, k);
  }
  return sum
}


////////// special functions //////////


/**
 * error function
 * @param {*} x upper limit of integral
 * @param {*} split the number of intervals
 * @param {*} n order of Legendre polynomial
 */
function erf(x,split=1e3,n=5){
  let func = function(t){return Math.exp(-1*t*t);};
  return gauss_legendre(func,0,x,split,n) * 2 / Math.sqrt(Math.PI);
}


/**
 * gamma function & lower incomplete gamma by Gauss-Legendre
 * @param {Number} s independent variable
 * @param {Number} x upper limit of integral
 * @param {Int} split the number of intervals
 * @param {Int} n order of Legendre polynomial
 */
function gamma(s,split=1e3,n=5){
  let func = function(t){return Math.pow(t,s-1)*Math.exp(-t);}; 
  return gauss_legendre(func,0,s*10,split,n); // must not integrate up to infinity
}
function incomplete_gamma(s,x,split=1e3,n=5){
  let func = function(t){return Math.pow(t,s-1)*Math.exp(-t);}; 
  return gauss_legendre(func,0,x,split,n);
}
function inv_gamma(y,iter=30){
  let f_prime = function(s){
    let func = function(t){return Math.log(s)*Math.pow(t,s-1)*Math.exp(-t);}; 
    return gauss_legendre(func,0,s*10);
  };
  let x0 = 2;
  while(gamma(x0) < y){x *= 1.5;} // find initial x0 s.t. Γ(x0)>y
  return newton(gamma,f_prime,y,x0,iter);
}
function inv_incomplete_gamma(s,y,x0=1,iter=30){
  let f = function(t){return incomplete_gamma(s,t);};
  let f_prime = function(t){return Math.pow(t,s-1)*Math.exp(-t);};
  return newton(f,f_prime,y,x0,iter);
}

/**
 * gamma function by Weierstrass's definition
 * @param {Number} s independent variable
 * @param {Int} N upper limit of series
 */
const Euler_const = 0.5772156649015328606 // Euler's constant 
function gamma2(s, N=1e5){
  let sum = Math.log(s)+Euler_const*s;
  for(var m=1;m<N;m++){
    sum += Math.log(1+s/m) - s/m
  }
  return Math.exp(-sum)
}


/**
 * Beta Function
 * @param {Number} a independent variable
 * @param {Number} b independent variable
 * @param {Number} x upper limit of integral
 * @param {Int} split the number of intervals
 * @param {Int} n order of Legendre polynomial
 */
function beta(a,b,split=1e3,n=5){
  let func = function(t){return Math.pow(t,a-1) * Math.pow((1-t),b-1);};
  return gauss_legendre(func,0,1,split,n);
}
function incomplete_beta(a,b,x,split=1e3,n=5){
  let func = function(t){return Math.pow(t,a-1) * Math.pow((1-t),b-1);};
  return gauss_legendre(func,0,x,split,n);
}





////////// methods for numeric analysis ////////// 

///// Gauss-Legendre quadrature /////

// weights[n] = [[zero point x_i, weight w_i],..]
const GL_weights = {
  2:[[0.57735026918962576451,1.0],
    [0.57735026918962576451,1.0]],
  3:[[-0.77459666924148337704,0.55555555555555555552],
    [0,0.88888888888888888889],
    [0.77459666924148337704,0.55555555555555555552]],
  4:[[-0.86113631159405257522,0.34785484513745385742],
    [-0.3399810435848562648,0.65214515486254614263],
    [0.3399810435848562648,0.65214515486254614263],
    [0.86113631159405257522,0.34785484513745385742]],
  5:[[-0.9061798459386639928,0.23692688505618908748],
    [-0.53846931010568309104,0.47862867049936646803],
    [0, 0.56888888888888888889],
    [0.53846931010568309104,0.47862867049936646803],
    [0.9061798459386639928,0.23692688505618908748]],
  6:[[-0.93246951420315202781,0.17132449237917034508],
    [-0.66120938646626451366,0.36076157304813860758],
    [-0.23861918608319690863,0.46791393457269104739],
    [0.23861918608319690863,0.46791393457269104739],
    [0.66120938646626451366,0.36076157304813860758],
    [0.93246951420315202781,0.17132449237917034508]],
  7:[[-0.94910791234275852453,0.1294849661688696932],
    [-0.74153118559939443986,0.27970539148927666793],
    [-0.40584515137739716691,0.38183005050511894494],
    [0,0.41795918367346938776],
    [0.40584515137739716691,0.38183005050511894494],
    [0.74153118559939443986,0.27970539148927666793],
    [0.94910791234275852453,0.1294849661688696932]]
  }

/**
 * gauss legendre quadrature
 * @param {Function} func function to be integrated
 * @param {Number} a lower limit of integral
 * @param {Number} b upper limit of integral
 * @param {Int} split the number of intervals, default=1000
 * @param {Number} n order of Legendre polynomial, default=5
 */
function gauss_legendre(func,a,b,split=1000,n=5){
  let cum_sum = 0; // total area
  let weight = GL_weights[n]; // coef
  let dx = (b-a)/split; // width of each interval
  for(var i=0;i<split;i++){
    var q = dx/2;
    var r = (2*i+1)*dx/2;
    var sum = 0;
    for(var j=0;j<n;j++){
      sum += func(q*weight[j][0]+r)*weight[j][1];
    }
    cum_sum += sum * q;
  }
  return cum_sum
}

///// Newton's Method /////

/**
 * solve y = f(x) by Newton's Method
 * x1 = x0 + (y-f(x0))/f'(x0)
 * @param {Function} func function to be analysed
 * @param {Function} func_prime derivative of the function
 * @param {Number} y value of the function 
 * @param {Number} x0 initial guess for x
 * @param {Int} iter the number of max iteration, default = 30
 */
function newton(func,func_prime,y,x0,iter=30){
  let x = x0;
  for(var i=0;i<iter;i++){
    x += (y-func(x))/func_prime(x)
    if(Math.abs(y-func(x))<1e-12){console.log(`iteration: ${i}/${iter}`);break;}
  }
  return x;
}

///// Brent's Method /////
/**
 * solve y = f(x) by Brent's Method
 * does not need f'(x)
 * @param {Number} y value of the function 
 * @param {Number} a0 opposite point of b0
 * @param {Number} b0 initial guess for x
 * @param {Function} func function to be analysed
 * @param {Int} iter the number of max iteration, default = 200
 * @param {Number} epsiron minimum width of each step
 */
function brent(func,y,a0,b0,iter=200,epsiron=1e-15){
  let f = function(x){return func(x)-y}; // redefine f(x) = 0
  if(f(a0)*f(b0)>0){ // a0 and b0 must have opposite sign
    return null;
  }else{
    if(f(a0)<f(b0)){[a0,b0] = [b0,a0];} // b0 must be less than a0
    let a = a0; b = [a0, a0, b0] // initialize
    let bisection = true  // method of previous step
    for(var i=0;i<iter;i++){
      s = b[2] - (b[2]-b[1])/(f(b[2])-f(b[1]))*f(b[2]); // interpolation
      m = (a+b[2])/2;  // bisection
      // determine whether to use interpolation
      if((b[2]<s<m || m<s<b[2]) && bisection){ // previous step = bisection
        if(Math.abs(b[2]-b[1])>epsiron && Math.abs(s-b[2])>Math.abs(b[2]-b[1])/2){
          b[0]=b[1]; b[1]=b[2]; b[2]=s; // update b with interpolation
          bisection = false;
        }else{
          b[0]=b[1]; b[1]=b[2]; b[2]=m; // update b with bisection
          bisection = true;
        }
      }else if((b[2]<s<m || m<s<b[2]) && !bisection){ // previous step = interpolation
        if(Math.abs(b[1]-b[0])>epsiron && Math.abs(s-b[2])>Math.abs(b[1]-b[0])/2){
          b[0]=b[1]; b[1]=b[2]; b[2]=s; // update b with interpolation
          bisection = false;
        }else{
          b[0]=b[1]; b[1]=b[2]; b[2]=m; // update b with bisection
          bisection = true;
        }
      }else{  // update b with bisection
        b[0]=b[1]; b[1]=b[2]; b[2]=m;
        bisection = true;
      }
      if(f(a)*f(b[2])>0){a=b[1];} // update a 
      if(f(a)<f(b[2])){[a,b[2]] = [b[2],a];} // exchange if f(a) < f(b)
      if(Math.abs(f(b[2]))<1e-12){
        console.log(`iteration: ${i}/${iter}`); break;
      }
    }
    return b[2];
  }
}

fc = function(x){
  return x*x*x;
}

func = function(x){
  return x**2 + 1
}

func1 = function(x){
  return 2*x
}