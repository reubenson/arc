class ShoppingCartContents extends React.Component {
	constructor(props) {
		super();
	}

  render() {
    var remove = this.props.remove;

    return (
      <section className="cart">
        <h2>Shopping Cart</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(function(item){
              return <LineItem key={item.type + item.id } item={item} remove={remove}/>
            })}
          </tbody>
        </table>
        <div id="checkout-total">Total: ${this.props.checkoutTotal}</div>
      </section>
    )
  }
};
