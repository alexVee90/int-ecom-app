const dotenv         = require('dotenv')

dotenv.config(); // @desc load env variables

const stripe = require('stripe')(process.env.STRIPE_SECRET);


module.exports = async (req, items) => {
  const productsForStripe = items.map(item => {
    return { 
      name: item.variant.product_id,
      description: item.variant.orderable,
      amount: (item.variant.price * 100).toFixed(),
      currency: 'usd',
      quantity: item.quantity 
    }
  });

  const success_url = `${req.protocol}://${req.get('host')}/auth/orders/success?session_id={CHECKOUT_SESSION_ID}`;
  const failure_url = `${req.protocol}://${req.get('host')}/failure`;

  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: productsForStripe,
    mode: 'payment',
    success_url:  `${success_url}`,
    cancel_url: failure_url,
  });
}