class CheckoutForm extends React.Component {
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
