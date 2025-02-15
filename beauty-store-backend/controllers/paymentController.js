const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: "sandbox", // Change to "live" for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

exports.processPayment = (req, res) => {
  const paymentData = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    transactions: [{ amount: { currency: "USD", total: req.body.total } }],
    redirect_urls: { return_url: "/success", cancel_url: "/cancel" }
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) return res.status(500).json(error);
    res.json({ approvalUrl: payment.links[1].href });
  });
};
