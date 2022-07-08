data {
  int<lower=0> N;
  vector<lower=0>[N] x;
  vector[N] y;
  int<lower=0> N_tilde;
  vector[N_tilde] x_tilde;
}

parameters {
  real intercept;
  real slope;
  real<lower=0> sigma;
}

model {
  y ~ normal(intercept + slope * x, sigma);
}

generated quantities {
  array[N_tilde] real y_tilde = normal_rng(intercept + slope * x_tilde, sigma);
}
