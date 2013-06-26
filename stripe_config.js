// Client / Server configuration object
StripeConfig = {};

StripeConfig.setAPIKey = function (key) {
    this.key = key;
    
    if (Meteor.isClient) {
        Stripe.setPublishableKey(key);
    }
    
}
