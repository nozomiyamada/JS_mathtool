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
function round(num, decimal){
  return Math.round(num * (10**decimal)) / (10**decimal)
}


////////// statistics /////////////

/** 
 * function for integrating Gaussian
 * z-score -> one-sided Pr (0≤Pr<0.5)
 * @param {Number} z z-score
 * @param {Int} N order of Taylor expansion
 * @return {Number} probability Pr(0≤x≤z)
 * Pr(z) = 1/√(2π)∫[0->z]exp(-x^2/2)dx = 0.5erf(z/√2)
 * ~ 1/√π Σ[n:0->N](z/√2)/(2n+1) Π[k:1->n]-(z/√2)^2/k
 * N=100 is default. if z<5, it is enough to set N~50
 */
function z_to_pr(z, N=100){
  var z = z/(2**0.5)
  let sum = 0;
  for(var n=0;n<=N;n++){ // Σ
    var product = 1;
    for(var k=1;k<=n;k++){ // Π
      product *= -z*z/k
    }
    sum += (z * product / (2*n+1))
  }
  return sum / Math.PI**0.5
}

/**
 * inverse function (Pr -> z-score)
 * one-sided Pr (0≤Pr<0.5) -> z-score
 * @param {Number} p probability Pr(0≤x≤z)
 * @param {Int} N order of Taylor expansion
 * @return {Number} z-score
 * z = ierf(2p)*√2
 * ~ Σ[n:0->N]Ck/(2k+1) (p√π)^(2K+1)
 * where Ck = Σ[m:0->k-1] C[m]C[k-1-m]/(m+1)(2m+1)
 * N=300 is default. it is enough for Pr < 0.475
 * if Pr > 0.499, this approx is not precise because ierf will diverge
 */
function pr_to_z(p, N=300){
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
  let total = 0
  for(var k=0;k<=N;k++){
    total += Ck[k]/(2*k+1) * ((Math.PI)**0.5 * p)**(2*k+1);
  }
  return total*(2**0.5)
}