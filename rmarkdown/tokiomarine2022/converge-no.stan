data {
  int<lower=0> N;
  array[N] int x;
}

parameters {
  real lambda;
  real jammer;
}

model {
  x ~ poisson(lambda + jammer);
}
