data {
  int<lower=0> N;
  int x[N];
}

parameters {
  real<lower=0,upper=1> p;
}

model {
  x ~ binomial(1, p);
}
