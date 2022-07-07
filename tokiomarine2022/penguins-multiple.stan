data {
  int<lower=0> N;
  vector<lower=0>[N] body_mass_g;
  vector<lower=0>[N] flipper_length_mm;
  array[N] int<lower=0,upper=1> sp_Chinstrap;
  array[N] int<lower=0,upper=1> sp_Gentoo;
}

parameters {
  real intercept;
  real slope;
  real b_chinstrap;
  real b_gentoo;
  real<lower=0> sigma;
}

model {
  array[N] real mu;
  for (i in 1:N) {
    mu[i] = intercept + slope * body_mass_g[i] + b_chinstrap * sp_Chinstrap[i] + b_gentoo * sp_Gentoo[i];
  }
  flipper_length_mm ~ normal(mu, sigma);
}
