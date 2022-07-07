data {
  int<lower=0> N;
  vector[N] temperature;
  vector[N] humidity;
  array[N] int<lower=0> beer_sales;
}

parameters {
  real intercept;
  real coef_t;
  real coef_h;
}

model {
  vector[N] lambda = exp(intercept + coef_t * temperature + coef_h * humidity);
  beer_sales ~ poisson(lambda);
}
