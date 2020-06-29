////////// statistics /////////////

/** 
 * function for integrating normal distribution
 * z-score -> one-tailed p(z≤x) [0≤p<0.5]
 * @param {Number} z z-score
 * @param {Int} N order of Taylor expansion
 * @return {Number} probability p(z≤x)
 * N=100 is default. if z<5, it is enough to set N~50
 */
function z_to_p(z, taylor=false, N=100){
  if(z<0){return NaN;}
  var z = z/(2**0.5);
  if(taylor==false){ // gauss legendre
    return 0.5 - 0.5 * erf(z)
  }else{ //taylor
    return 0.5 - 0.5 * erf2(z, N)
  }
}
/**
 * inverse normal distribution (p -> z-score)
 * @param {*} p p-value = 1/2 - CDF[0->z]
 * use Newton's method or Taylor
 */
function p_to_z(p, taylor=false, N=300){
  if(p<0 || 0.5<p){return NaN;}
  if(taylor==false){ // Newton's method
    return Math.sqrt(2) * inv_erf(1-2*p)
  }else{ //taylor
    return Math.sqrt(2) * inv_erf2(1-2*p, N)
  }
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