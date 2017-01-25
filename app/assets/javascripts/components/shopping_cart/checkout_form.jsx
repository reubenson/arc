class CheckoutForm extends React.Component {
  componentDidMount() {
    var url = '/api/v1/get_token';

    this.serverRequest = $.get(url, function(result) {
      this.csrf = result.csrf_token;
      braintree.setup(result.token,
        "dropin", {
        container: "payment-form",
        onPaymentMethodReceived: function(e) {
          this.handleSubmit(e);
        }.bind(this)
      });
    }.bind(this));
  }

  handleSubmit(e) {
    var params = {
      payment_method_nonce: e.nonce,
      transaction_amt: this.checkoutTotal(),
      csrf_token: this.csrf
    };

    this.props.handleCheckout(params);
  }

  render() {
    return (
      <form id="checkout" action="/checkout" method='post'>
        <div id="payment-form"></div>
        <input type="hidden" name="transaction_amt" value={this.props.checkoutTotal}/>
        <input type="submit" name="transaction_amt" value={"Pay $" + this.props.checkoutTotal}/>
      </form>
    )
  }
};
