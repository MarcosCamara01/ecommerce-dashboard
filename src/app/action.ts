"use server";

import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import Stripe from "stripe";

export const getProducts = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const STRIPE_SECRET_KEY = session?.user.stripe_secret;

  const stripe = new Stripe(STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const products = await stripe.products.list({ limit: 100 });
  return products.data;
}

export const getOrders = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const STRIPE_SECRET_KEY = session?.user.stripe_secret;

  const stripe = new Stripe(STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const orders = await stripe.charges.list({ limit: 100 });
  return orders.data;
}

export const getCustomers = async () => {
  const session: Session | null = await getServerSession(authOptions);
  const STRIPE_SECRET_KEY = session?.user.stripe_secret;

  const stripe = new Stripe(STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const customers = await stripe.customers.list({ limit: 100 });
  return customers.data;
}