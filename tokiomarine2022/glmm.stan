data {
  int<lower=0> N;
  array[N] int<lower=0> y;
}

parameters {
  real a;           // mean ability
  vector[N] r;      // individual difference
  real<lower=0> s;  // sd of r
}

transformed parameters {
  vector[N] p = inv_logit(a + r);
}

model {
  y ~ binomial(8, p);
  a ~ normal(0, 10);
  r ~ normal(0, s);
  s ~ student_t(3, 0, 1);
}
