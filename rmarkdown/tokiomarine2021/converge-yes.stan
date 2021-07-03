data {
  int<lower=0> N;
  int x[N];
}

parameters {
  real<lower=0> lambda;
}

model {
  x ~ poisson(lambda);
}
