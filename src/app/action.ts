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