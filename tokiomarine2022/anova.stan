data {
  int<lower=0> N;
  vector<lower=0,upper=1>[N] sunny;
  vector<lower=0,upper=1>[N] rainy;
  vector<lower=0>[N] beer_sales;
}

parameters {
  real intercept;
  real coef_s;
  real coef_r;
  real sigma;
}

model {
  vector[N] mu = intercept + coef_s * sunny + coef_r * rainy;
  beer_sales ~ normal(mu, sigma);
}
