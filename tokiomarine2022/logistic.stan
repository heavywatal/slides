data {
  int<lower=0> N;
  int<lower=0> n_trials;
  vector[N] temperature;
  array[N] int<lower=0,upper=n_trials> beer_sales;
}

parameters {
  real intercept;
  real slope;
}

model {
  vector[N] p = inv_logit(intercept + slope * temperature);
  beer_sales ~ binomial(n_trials, p);
}
