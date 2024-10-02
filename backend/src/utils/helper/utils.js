export const isEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ROLE_TYPES = { ADMIN: 1, MEMBER: 2 };

export const CREDIT_REQUESTS_STATUS = {
  PENDING: 'PENDING',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
};

export const TRANSACTIONS_TYPE = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
};
