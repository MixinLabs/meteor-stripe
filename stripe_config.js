// Client / Server configuration object
StripeConfig = { livemode: false };

StripeConfig.setAPIKey = function (key) {
    this.key = key;
    
    if (Meteor.isClient) {
        Stripe.setPublishableKey(key);
    }
    
}

StripeConfig.enableLiveMode = function () {
    this.livemode = true;
}

StripeConfig.disableLiveMode = function () {
    this.livemode = false;
}