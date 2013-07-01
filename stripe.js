Stripe = {
    url: 'https://api.stripe.com/v1/'
};

// Set API Key
Stripe.setAPIKey = function (key) {
    this.api_key = key;
};

// Make HTTP POST request
Object.defineProperty(Stripe, '_call', {
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
            value: _.bind(Stripe.Charge.refund, Stripe.Charge, chargeId)
        });
    
        Object.defineProperty(result, 'capture', {
            value: _.bind(Stripe.Charge.capture, Stripe.Charge, chargeId)
        });
        
        Object.defineProperty(result, 'updatDispute', {
            value: _.bind(Stripe.Dispute.update, Stripe.Charge, chargeId)
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
Stripe.Charge.all = function (params) {
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
        
        Object.defineProperty(result, 'updateSubscription', {
            value: _.bind(Stripe.Subscription.update, Stripe.Customer, customerId)
        });
        
        Object.defineProperty(result, 'cancelSubscription', {
            value: _.bind(Stripe.Subscription.cancel, Stripe.Customer, customerId)
        });
        
        
        Object.defineProperty(result, 'deleteDiscount', {
            value: _.bind(Stripe.Discount.delete, Stripe.Customer, customerId)
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
Stripe.Customer.all = function (params) {
    return Stripe._call('GET', this.url, params);
};



// Plan API
Stripe.Plan = {
    url: Stripe.url + 'plans'
};

// Plan API::create
Stripe.Plan.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Plan API::retrieve
Stripe.Plan.retrieve = function (planId) {
    var url = this.url + '/' + planId,
        result = Stripe._call('GET', url);
    
    if (!result.error) {
        result.update = {};
    
        Object.defineProperty(result.update, 'save', {
            value: _.bind(Stripe.Plan.update, Stripe.Plan, planId, result.update)
        });
        
        Object.defineProperty(result, 'delete', {
            value: _.bind(Stripe.Plan.delete, Stripe.Plan, planId)
        });
    }
    
    return result;
};

// Plan API::update
Stripe.Plan.update = function (planId, params) {
    var url = this.url + '/' + planId;
    
    return Stripe._call('POST', url, params);
};

// Plan API::delete
Stripe.Plan.delete = function (planId) {
    var url = this.url + '/' + planId;
    
    return Stripe._call('DELETE', url);
};

// Plan API::all
Stripe.Plan.all = function (params) {
    return Stripe._call('GET', this.url, params);
};



// Subscription API
Stripe.Subscription = {};

// Subscription API::update
Stripe.Subscription.update = function (customerId, params) {
    var url = Stripe.Customer.url + '/' + customerId + '/subscription';
    
    return Stripe._call('POST', url, params);
};

// Subscription API::cancel
Stripe.Subscription.cancel = function (customerId, params) {
    var url = Stripe.Customer.url + '/' + customerId + '/subscription';
    
    return Stripe._call('DELETE', url, params);
};



// Coupon API
Stripe.Coupon = {
    url: Stripe.url + 'coupons'
};

// Coupon API::create
Stripe.Coupon.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Coupon API::retrieve
Stripe.Coupon.retrieve = function (couponId) {
    var url = this.url + '/' + couponId,
        result = Stripe._call('GET', url);
    
    Object.defineProperty(result, 'delete', {
        value: _.bind(Stripe.Coupon.delete, Stripe.Coupon, couponId)
    });
    
    return result;
};

// Coupon API::delete
Stripe.Coupon.delete = function (couponId) {
    var url = this.url + '/' + couponId;
    
    return Stripe._call('DELETE', url);
};

// Coupon API::all
Stripe.Coupon.all = function (params) {
    return Stripe._call('GET', this.url, params);
};


// Discount API
Stripe.Discount = {};

// Discount API::delete
Stripe.Discount.delete = function (customerId) {
    var url = Stripe.Customer.url + '/' + customerId + '/discount';
    
    return Stripe._call('DELETE', url);
};



// Invoice API
Stripe.Invoice = {
    url: Stripe.url + 'invoices'
};

// Invoice API::retrieve
Stripe.Invoice.retrieve = function (invoiceId) {
    var url = this.url + '/' + invoiceId,
        result = Stripe._call('GET', url);
    
    if (!result.error) {
        
        result.update = {};
        
        Object.defineProperty(result.update, 'save', {
            value: _.bind(Stripe.Invoice.update, Stripe.Invoice, invoiceId, result.update)
        });
        
        Object.defineProperty(result, 'pay', {
            value: _.bind(Stripe.Invoice.pay, Stripe.Invoice, invoiceId)
        });
        
        if (result.lines) {
            Object.defineProperty(result.lines, 'all', {
                value: _.bind(Stripe.Invoice.retrieveLines, Stripe.Invoice, invoiceId)
            });
        }
    }
        
    return result;
};

// Invoice API::retrieveLines
Stripe.Invoice.retrieveLines = function (invoiceId, params) {
    var url = this.url + '/' + invoiceId + '/lines';
    
    return Stripe._call('GET', url, params);
};

// Invoice API::create
Stripe.Invoice.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Invoice API::pay
Stripe.Invoice.pay = function (invoiceId) {
    var url = this.url + '/' + invoiceId + '/pay';
    
    return Stripe._call('POST', url);
};

// Invoice API::update
Stripe.Invoice.update = function (invoiceId, params) {
    var url = this.url + '/' + invoiceId;
    
    return Stripe._call('POST', url, params);
};

// Invoice API::all
Stripe.Invoice.all = function (params) {
    return Stripe._call('GET', this.url, params);
};

// Invoice API::upcoming
Stripe.Invoice.upcoming = function (params) {
    var url = this.url + '/upcoming';
    
    return Stripe._call('GET', url, params);
};



// InvoiceItems API
Stripe.InvoiceItems = {
    url: Stripe.url + 'invoiceitems'
};

// InvoiceItems API::create
Stripe.InvoiceItems.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// InvoiceItems API::retrieve
Stripe.InvoiceItems.retrieve = function (invoiceItemId) {
    var url = this.url + '/' + invoiceItemId,
        result = Stripe._call('GET', url);
        
    if (!result.error) {
        result.update = {};
        
        Object.defineProperty(result.update, 'save', {
            value: _.bind(Stripe.InvoiceItems.update, Stripe.InvoiceItems, invoiceItemId, result.update)
        });
        
        Object.defineProperty(result, 'delete', {
            value: _.bind(Stripe.InvoiceItems.delete, Stripe.InvoiceItems, invoiceItemId)
        });
    }
    
    return result;
};

// InvoiceItems API::update
Stripe.InvoiceItems.update = function (invoiceItemId, params) {
    var url = this.url + '/' + invoiceItemId;
    
    return Stripe._call('POST', url, params);
};

// InvoiceItems API::all
Stripe.InvoiceItems.all = function (params) {
    return Stripe._call('GET', this.url, params);
};

// InvoiceItems API::delete
Stripe.InvoiceItems.delete = function (invoiceItemId) {
    var url = this.url + '/' + invoiceItemId;
    
    return Stripe._call('DELETE', url);
};


// Dispute API
Stripe.Dispute = {};

// Dispute API::update
Stripe.Dispute.update = function (chargeId, params) {
    var url = Stripe.Charge.url + '/' + chargeId + '/dispute';
    
    return Stripe._call('POST', url, params);
};


// Transfer API
Stripe.Transfer = {
    url: Stripe.url + 'transfers'
};

// Transfer API::create
Stripe.Transfer.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Transfer API::retrieve
Stripe.Transfer.retrieve = function (transferId) {
    var url = this.url + '/' + transferId,
        result = Stripe._call('GET', url);
        
    if (!result.error) {
        Object.defineProperty(result, 'cancel', {
            value: _.bind(Stripe.Transfer.cancel, Stripe.Transfer, transferId)
        });
    }
    
    return result;
};

// Transfer API::cancel
Stripe.Transfer.cancel = function (transferId) {
    var url = this.url + '/' + transferId + '/cancel';
    
    return Stripe._call('POST', url)
};

// Transfer API::all
Stripe.Transfer.all = function (params) {
    return Stripe._call('GET', this.url, params);
};



// Recipient API
Stripe.Recipient = {
    url: Stripe.url + 'recipients'
};

// Recipient API::create
Stripe.Recipient.create = function (params) {
    return Stripe._call('POST', this.url, params);
};

// Recipient API::retrieve
Stripe.Recipient.retrieve = function (recipientId) {
    var url = this.url + '/' + recipientId,
        result = Stripe._call('GET', url);
        
    if (!result.error) {
        result.update = {};
        
        Object.defineProperty(result.update, 'save', {
            value: _.bind(Stripe.Recipient.update, Stripe.Recipient, recipientId, result.update)
        });
        
        Object.defineProperty(result, 'delete', {
            value: _.bind(Stripe.Recipient.delete, Stripe.Recipient, recipientId)
        });
    }
    
    return result;
};

// Recipient API::update
Stripe.Recipient.update = function (recipientId, params) {
    var url = this.url + '/' + recipientId;
    
    return Stripe._call('POST', url, params);
};

// Recipient API::delete
Stripe.Recipient.delete = function (recipientId) {
    var url = this.url + '/' + recipientId;
    
    return Stripe._call('DELETE', url)
};

// Recipient API::all
Stripe.Recipient.all = function (params) {
    return Stripe._call('GET', this.url, params);
};