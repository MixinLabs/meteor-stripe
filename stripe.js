Stripe = {
    url: 'https://api.stripe.com/v1/'
};

// Set API Key
Stripe.setAPIKey = function (key) {
    this.api_key = key;
};

// Make HTTP Post request
Stripe.post = function (url, hash) {
    var auth = hash.auth;
    
    Stripe.api_key = Stripe.api_key || StripeConfig.key;
    if (!Stripe.api_key) {
        throw "API Key is not provided."
    }
    
    if (!auth) {
        auth = Stripe.api_key + ':';
    } 
    delete hash['auth'];
    
    return Meteor.http.post(url, {
        auth: auth,
        params: hash
    });
};

// Charge API
Stripe.Charge = {
    url: Stripe.url + 'charges'
};

// Charge API::create
Stripe.Charge.create = function (options) {
    var result;
    
    result = Stripe.post(this.url, {
        card: 'tok_25sTPSXNNcKwe1',
        amount: 999,
        currency: 'EUR'
    });
    
    console.log(result);
};