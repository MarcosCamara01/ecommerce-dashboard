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
  const response = await stripe.charges.list({ limit: 100 });
  const orders = response.data;

  const earningsPerMonth: { [key: string]: number } = {};
  const currentDate = new Date();

  const fiveMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1);
  const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.created * 1000);
      return orderDate >= fiveMonthsAgo;
  });

  for (let i = 0; i < filteredOrders.length; i++) {
      const order = filteredOrders[i];
      const orderDate = new Date(order.created * 1000);
      const monthKey = orderDate.toISOString().slice(0, 7); // Formato AAAA-MM
      earningsPerMonth[monthKey] = (earningsPerMonth[monthKey] || 0) + order.amount / 100;
  }

  const filteredKeys = Object.keys(earningsPerMonth).filter(key => !isNaN(earningsPerMonth[key]));

  filteredKeys.sort();

  const orderedEarningsPerMonth: { [key: string]: number } = {};
  filteredKeys.forEach(key => {
      orderedEarningsPerMonth[key] = earningsPerMonth[key];
  });

  return orderedEarningsPerMonth;
};
