Meteor.Router.add('/stripe/checkout', 'POST', function () {
    var params = this.request.body,
        redirectURL = params.redirectURL || this.request.headers.referer,
        rejectKeys = ['stripeToken', 'name', 'image', 'panel-label', 'label', 'address', 'redirectURL'],
        result;
    
    params.card = params.stripeToken;

    _.each(rejectKeys, function (key) {
        delete params[key];
    });
     
    result = Stripe.Charge.create(params);
    
    if (result.error) {
        return [400, result.error.message];
    }
    
    return [302, {Location: redirectURL}, ''];
});