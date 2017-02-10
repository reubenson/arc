class ShoppingCartContents extends React.Component {
	constructor(props) {
		super();
	}

  render() {
    var remove = this.props.remove;

    return (
      <section className="shopping-cart-contents">
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
            <tr>
              <td></td>
              <td></td>
              <td className="shopping-cart-contents-total">Total:</td>
              <td className="shopping-cart-contents-total-value">${this.props.checkoutTotal}</td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
};
