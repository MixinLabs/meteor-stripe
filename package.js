Package.describe({
    summary: "Payments for developers. Stripe makes it easy to start accepting credit cards on the web today."
});

Package.on_use(function (api) {
    api.use(['underscore', 'jquery', 'templating'], 'client');
    
    // Load stripe.js in the <head> and provide Handlebars helpers
    api.add_files(['stripe.html', 'stripe_helpers.js'], 'client');
    
    // StripeConfig
    api.add_files('stripe_config.js', ['client', 'server'])
});