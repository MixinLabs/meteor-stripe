Stripe = {
    url: 'https://api.stripe.com/v1/'
};

// Set API Key
Stripe.setAPIKey = function (key) {
    this.api_key = key;
};

// Make HTTP POST request
Object.defineProperty(Stripe, '_call', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function (method, url, hash) {
        var result = {};
    
        Stripe.api_key = Stripe.api_key || StripeConfig.key;
        if (!Stripe.api_key) {
            throw "API Key is not provided."
        }
        
        try {
            result = Meteor.http.call(method, url, {
                auth: Stripe.api_key + ':',
                params: hash
            });
        } catch (e) {
            result = e.response;
        }
        
        return result.data;
    }
});

// Charge API
Stripe.Charge = {
    url: Stripe.url + 'charges'
};

// Charge API::create
Stripe.Charge.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Charge API::retrieve
Stripe.Charge.retrieve = function (chargeId) {
    var url = this.url + '/' + chargeId,
        result = Stripe._call('GET', url);
    
    if (!result.error) {
        Object.defineProperty(result, 'refund', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: _.bind(Stripe.Charge.refund, Stripe.Charge, chargeId)
        });
    
        Object.defineProperty(result, 'capture', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: _.bind(Stripe.Charge.capture, Stripe.Charge, chargeId)
        });
    }
    
    return result;
};

// Charge API::refund
Stripe.Charge.refund = function (chargeId, amount, refundApplicationFee) {
    var url = this.url + '/' + chargeId + '/refund',
        params = {};
        
    if (! _.isUndefined(amount)) {
        params['amount'] = amount;
    }
    
    if (! _.isUndefined(refundApplicationFee)) {
        params['refund_application_fee'] = refund_application_fee;
    }
    
    return Stripe._call('POST', url, params);
};


// Charge API::capture
Stripe.Charge.capture = function (chargeId, amount, applicationFee) {
    var url = this.url + '/' + chargeId + '/capture',
        params = {};
        
    if (! _.isUndefined(amount)) {
        params['amount'] = amount;
    }
    
    if (! _.isUndefined(applicationFee)) {
        params['application_fee'] = application_fee;
    }
    
    return Stripe._call('POST', url, params);
};


// Charge API::all
Stripe.Charge.all = function (count, created) {
    var params = {};
    
    if (! _.isUndefined(count)) {
        params['count'] = count;
    }
    
    if (! _.isUndefined(created)) {
        params['created'] = created;
    }
    
    return Stripe._call('GET', this.url, params);
}



// Customer API
Stripe.Customer = {
    url: Stripe.url + 'customers'
}

// Customer API::create
Stripe.Customer.create = function (params) {
    return Stripe._call('POST', this.url, params);
};


// Customer API::retrieve
Stripe.Customer.retrieve = function (customerId) {
    var url = this.url + '/' + customerId,
        result = Stripe._call('GET', url);
    
    if (!result.error) {
        result.update = {};
    
        Object.defineProperty(result.update, 'save', {
            value: _.bind(Stripe.Customer.update, Stripe.Customer, customerId, result.update)
        });
        
        Object.defineProperty(result, 'delete', {
            value: _.bind(Stripe.Customer.delete, Stripe.Customer, customerId)
        });
    }
    
    return result;
};

// Customer API::update
Stripe.Customer.update = function (customerId, params) {
    var url = this.url + '/' + customerId;
    
    return Stripe._call('POST', url, params);
};

// Customer API::delete
Stripe.Customer.delete = function (customerId) {
    var url = this.url + '/' + customerId;
    
    return Stripe._call('DELETE', url);
};

// Customer API::all
Stripe.Customer.all = function () {
    return Stripe._call('GET', this.url);
};