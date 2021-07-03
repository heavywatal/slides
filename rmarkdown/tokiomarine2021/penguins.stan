data {
  int<lower=0> N;
  vector<lower=0>[N] body_mass_g;
  vector<lower=0>[N] flipper_length_mm;
}

parameters {
  real intercept;
  real slope;
  real<lower=0> sigma;
}

model {
  flipper_length_mm ~ normal(intercept + slope * body_mass_g, sigma);
}
