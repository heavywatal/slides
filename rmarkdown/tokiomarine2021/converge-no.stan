data {
  int<lower=0> N;
  int x[N];
}

parameters {
  real lambda;
  real jammer;
}

model {
  x ~ poisson(lambda + jammer);
}
