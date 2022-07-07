data {
  int<lower=0> N;
  vector<lower=0>[N] x;
  array[N] int<lower=0> y;
}

parameters {
  real intercept;
  real slope;
}

model {
  vector[N] lambda = exp(intercept + slope * x);
  y ~ poisson(lambda);
}
