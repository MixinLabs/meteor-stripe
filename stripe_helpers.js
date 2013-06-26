/**** Well this is a very ugly, embarrassing hack :-( ****/
Template._stripeCheckout.rendered = function () {
    var self = this,
        data = self.data,
        form = self.find('form'),
        script = document.createElement('script'),
        $script = $(script);
    
    _.each(data, function (val, key) {
        data['data-'+key] = val;
        delete data[key];
    });
    
    $script.attr('src', 'https://checkout.stripe.com/v2/checkout.js');
    $script.addClass('stripe-button');
    $script.attr(data);
    form.appendChild(script);
};

Handlebars.registerHelper("stripeCheckout", function (opts) {
    return new Handlebars.SafeString(Template._stripeCheckout(opts.hash));
});