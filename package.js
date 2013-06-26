Package.describe({
    summary: "Payments for developers. Stripe makes it easy to start accepting credit cards on the web today."
});

Package.on_use(function (api) {
    api.use(['templating'], 'client');
    
    // Load stripe.js in the <head>
    api.add_files('stripe.html', 'client');
});