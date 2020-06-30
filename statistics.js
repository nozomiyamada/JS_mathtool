////////// statistics /////////////


function mean(arr){
  if(!Array.isArray(arr)){arr = [arr];}
  let N = arr.length;
  return arr.reduce(function(acc, cur){return acc + cur;})/N;
}
function median(arr){
  if(!Array.isArray(arr)){arr = [arr];}
  let N = arr.length;
  arr.sort();
  if(N%2==0){
    return (arr[N/2] + arr[N/2-1])/2;
  }else{
    return arr[(N-1)/2];
  }
}
function variance(arr, unbiased=true){
  if(!Array.isArray(arr)){arr = [arr];}
  if(unbiased==true){
    var N = arr.length-1;
  }else{
    var N = arr.length;
  }
  let mu = mean(arr);
  return arr.reduce(function(acc, cur){return acc+(cur-mu)**2;},0)/N;
}
function std(arr, unbiased=true){
  if(!Array.isArray(arr)){arr = [arr];}
  return Math.sqrt(variance(arr, unbiased))
}
function sem(arr){
  return std(arr)/Math.sqrt(arr.length);
}
function skewness(arr, regularize=false){
  if(!Array.isArray(arr)){arr = [arr];}
  let N = arr.length;
  let mu = mean(arr);
  let sd = std(arr, false);
  let sk = arr.reduce(function(acc, cur){return acc+((cur-mu)/sd)**3;},0)/N;
  if(regularize==false){
    return sk;
  }else{
    return sk*Math.sqrt(N-1)/(N-2);
  }
}
function welch(arr1, arr2){
  let mu1 = mean(arr1); let mu2 = mean(arr2);
  let v1 = variance(arr1); let v2 = variance(arr2);
  let n1 = arr1.length; let n2 = arr2.length;
  let t = (mu1-mu2)/Math.sqrt(v1/n1+v2/n2);
  let df = (v1/n1+v2/n2)**2 / ((v1/n1)**2/(n1-1)+(v2/n2)**2/(n2-1));
  return [t,df];
}

/** 
 * normal distribution
 * z-score -> one-tailed p(z≤x) [0≤p<0.5]
 * @param {Number} z z-score
 * @param {Boolean} taylor whether to use Taylor expansion
 * @param {Number} N order of Taylor expansion
 * @return {Number} probability p(z≤x)
 * N=100 is default. if z<5, it is enough to set N~50
 */
function z_to_p(z, taylor=false, N=100){
  if(z<0){return NaN;}
  var z = z/(2**0.5);
  if(taylor==false){ // gauss legendre
    return 0.5 - 0.5 * erf(z);
  }else{ //taylor
    return 0.5 - 0.5 * erf2(z, N);
  }
}
/**
 * inverse normal distribution (p -> z-score)
 * @param {Number} p p-value
 * @param {Boolean} taylor whether to use Taylor expansion
 * @param {Number} N order of Taylor expansion
 * @return {Number} z-score
 * use Newton's method or Taylor
 */
function p_to_z(p, taylor=false, N=300){
  if(p<0 || 0.5<p){return NaN;}
  if(taylor==false){ // Newton's method
    return Math.sqrt(2) * inv_erf(1-2*p);
  }else{ //taylor
    return Math.sqrt(2) * inv_erf2(1-2*p, N);
  }
}



/**
 * t-distribution
 * @param {Number} t t-score 
 * @param {Number} df degree of freedom
 */
function t_to_p(t,df){
  let x = (t+Math.sqrt(t**2+df))/(2*Math.sqrt(t**2+df));
  return 1-regularized_beta(df/2,df/2,x);
}
/**
 * inverse t-distribution
 * @param {*} p p-value < 0.5
 * @param {*} df degree of freedom
 * use Newton's method
 */
function p_to_t(p,df){
  let x = inv_regularized_beta(df/2,df/2,1-p);
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
  return 1-regularized_beta(df1/2,df2/2,x);
}
/**
 * inverse F-distribution
 * @param {Number} p p-value < 0.5
 * @param {Number} df1 degree of freedom
 * @param {Number} df2 degree of freedom
 * use Newton's method
 * f = df2*x/df1(1-x)
 */
function p_to_f(p, df1, df2){
  let x = inv_regularized_beta(df1/2,df2/2,1-p);
  return df2*x/(df1*(1-x));
}



/**
 * chi-square distribution
 * @param {Number} chi chi2-score 
 * @param {Number} df degree of freedom
 */
function chi_to_p(chi,df){
  return 1-incomplete_gamma(df/2,chi/2)/gamma(df/2);
}
function p_to_chi(p,df){
  return inv_incomplete_gamma(df/2,(1-p)*gamma(df/2))*2;
}



/**
 * Poisson Distribution
 * @param {Number} lambda event rate in an interval
 * @param {Int} k the number of times an event occurs in an interval 
 * @return {Number} probability P(X=k)
 */
function poisson(lambda, k){
  if(Number.isInteger(k)){
    return (lambda**k) * (Math.exp(-lambda)) / fact(k);
  }else{
    return (lambda**k) * (Math.exp(-lambda)) / gamma(k+1);
  }
}
function poisson_cum(lambda, k){
  if(!Number.isInteger(k)){return NaN;}
  let sum = 0;
  for(var i=0;i<k;i++){
    sum += poisson(lambda, i);
  }
  return 1-sum;
}
function poisson_to_p(lambda, k, split=100){
  let func = function(t){return (lambda**t)*(Math.exp(-lambda))/gamma(t+1);}
  return 1-gauss_legendre(func,0,k,split);
}
