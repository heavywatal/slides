data {
  int<lower=0> N;
  int y[N];
}

parameters {
  real a;           // mean ability
  vector[N] r;      // individual difference
  real<lower=0> s;  // sd of r
}

model {
  y ~ binomial(8, inv_logit(a + r));
  a ~ normal(0, 10);
  r ~ normal(0, s);
  s ~ exponential(0.01);
}
