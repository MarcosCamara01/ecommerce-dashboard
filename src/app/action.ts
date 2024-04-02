"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const getProducts = async () => {
  const products = await stripe.products.list({ limit: 100 });
  return products.data;
}

export const getOrders = async () => {
  const orders = await stripe.charges.list({ limit: 100 });
  return orders.data;
}

export const getCustomers = async () => {
  const customers = await stripe.customers.list({ limit: 100 });
  return customers.data;
}

export const calculateEarningsPerMonth = async () => {
  const balanceTransactions = await stripe.balanceTransactions.list({
    limit: 100,
  });

  const earningsPerMonth: { [key: string]: number } = {};
  const currentDate = new Date();

  const fiveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);

  balanceTransactions.data.forEach(transaction => {
    const transactionDate = new Date(transaction.created * 1000);
    if (transactionDate >= fiveMonthsAgo && transaction.amount > 0) {
      const monthKey = transactionDate.toISOString().slice(0, 7);
      earningsPerMonth[monthKey] = (earningsPerMonth[monthKey] || 0) + transaction.amount / 100;
    }
  });

  const orderedEarningsPerMonth: { [key: string]: number } = {};

  const filteredKeys = Object.keys(earningsPerMonth).filter(key => !isNaN(earningsPerMonth[key]));

  filteredKeys.sort();

  filteredKeys.forEach(key => {
    orderedEarningsPerMonth[key] = earningsPerMonth[key];
  });

  return orderedEarningsPerMonth;
};


export const calculateBuyersPerMonth = async () => {
  const customers = await stripe.customers.list({
    limit: 100,
  });

  const usersPerMonth: { [key: string]: number } = {};
  const currentDate = new Date();

  const fiveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);

  customers.data.forEach(customer => {
    const customerCreatedDate = new Date(customer.created * 1000);
    if (customerCreatedDate >= fiveMonthsAgo) {
      const monthKey = customerCreatedDate.toISOString().slice(0, 7);
      usersPerMonth[monthKey] = (usersPerMonth[monthKey] || 0) + 1;
    }
  });

  const orderedUsersPerMonth: { [key: string]: number } = {};

  const filteredKeys = Object.keys(usersPerMonth).filter(key => !isNaN(usersPerMonth[key]));

  filteredKeys.sort();

  filteredKeys.forEach(key => {
    orderedUsersPerMonth[key] = usersPerMonth[key];
  });

  return orderedUsersPerMonth;
};

export const totalBalance = async () => {
  const balance = await stripe.balance.retrieve();

  const availableBalance = balance.available.reduce((total, item) => total + item.amount, 0);

  const totalBalance = availableBalance / 100;
  return totalBalance;
}