Package.describe({
    summary: "Payments for developers. Stripe makes it easy to start accepting credit cards on the web today."
});

Package.on_use(function (api) {
    // Common
    api.use(['underscore'], ['client', 'server']);
    
    // Client
    api.use(['jquery', 'templating'], 'client');
    
    // Server
    api.use(['http', 'router'], 'server');
    
    // Load stripe.js in the <head> and provide Handlebars helpers
    api.add_files(['stripe.html', 'stripe_helpers.js'], 'client');
    
    // StripeConfig
    api.add_files('stripe_config.js', ['client', 'server'])
    
    // Stripe server-side interface
    api.add_files('stripe.js', 'server');
    
    // Stripe checkout
    api.add_files('stripe_checkout.js', 'server');
});