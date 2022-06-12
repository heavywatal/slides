data {
  int<lower=0> N;
  array[N] int x;
}

parameters {
  real<lower=0> lambda;
}

model {
  x ~ poisson(lambda);
}
