/**
    Well this is a very-very ugly, embarrassing hack! :-(
    But otherwise, I couldn't get Meteor to handle the <script> tag properly
**/
Template._stripeCheckout.rendered = function () {
    var self = this,
        data = self.data,
        form = self.find('form'),
        script = document.createElement('script'),
        $script = $(script),
        $tempEl;
    
    if (!data.key && StripeConfig.key) {
        data.key = StripeConfig.key;
    }
    
    _.each(data, function (val, key) {
        if (key !== 'key') {
            $tempEl = $('<input type=hidden />').val(val).attr('name', key);
            form.appendChild($tempEl[0]);
        }
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