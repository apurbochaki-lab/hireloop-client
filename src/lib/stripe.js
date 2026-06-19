import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PRODUCT_PRICE_ID = {
    'seeker_pro': 'price_1Tjx9QLm0OQi6gzgIr6uKJUL',
    'seeker_premium': 'price_1TjxgXLm0OQi6gzgNl32RJtB',
    'recruiter_growth': 'price_1TjxhmLm0OQi6gzgfvdrWahu',
    'recruiter_enterprise': 'price_1TjxipLm0OQi6gzgA1NBwtL8',
}