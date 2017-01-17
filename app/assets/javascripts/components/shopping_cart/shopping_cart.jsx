class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};
	}

	attachEventHandlers() {
		document.body.addEventListener('click', this.handleClick.bind(this));
	}

	componentDidMount() {
		var url = '/api/v1/initialize_cart';

		this._cartContainer = document.querySelector('.cart-container');
		this._cartBtn = document.getElementById('cart-btn');
		this._checkoutForm = document.getElementById('checkout');

		this.attachEventHandlers();

		this.serverRequest = $.get(url, function (result) {
			this.setState({items: result.carts});
			this.updateCartBtn();
		}.bind(this));
	}

	handleCheckout(params) {
		var url = '/api/v1/checkout';

		this.serverRequest = $.post(url, params, function(result) {
			alert(result.message);
			this.setState({items: result.items});
			this.updateCartBtn();
		}.bind(this));
	}

	handleClick(e) {
		if (e.target.classList.contains('add-work-to-cart-btn')) {
			this.addWorkToCart(e);
		} else if (e.target.classList.contains('add-piece-to-cart-btn')) {
			this.addPieceToCart(e);
		}
	}

	addWorkToCart(e) {
		var _work = findParentElement(e.target,'work'),
			workId = _work.dataset.workid,
			url = '/api/v1/add_to_cart?WorkId=' + workId;

		this.serverRequest = $.post(url, function (result) {
			this.setState({
				items: result.carts,
			});
			this.updateCartBtn();
		}.bind(this));
	}

	addPieceToCart(e) {
		var _piece = findParentElement(e.target,'piece'),
			pieceId = _piece.dataset.pieceid,
			url = '/api/v1/add_to_cart?PieceId=' + pieceId;

		this.serverRequest = $.post(url, function(result) {
			this.setState({
				items: result.carts,
			});
			this.updateCartBtn();
		}.bind(this));
	}

	removeItemFromCart(e) {
		var itemType = e.target.dataset.itemType,
			itemId = e.target.dataset.itemId,
			url = '/api/v1/remove_from_cart?item_id=' + itemId + '&item_type=' + itemType;

		this.serverRequest = $.post(url, function(result) {
			this.setState({
				items: result.carts
			})
			this.updateCartBtn();
		}.bind(this));
	}

	numberOfItems() {
		return this.state.items.length;
	}

	updateCartBtn() {
		var numItems = this.numberOfItems(),
			numItemsText = ( numItems > 0 ) ? 'Cart (' + numItems + ')' : 'Cart';

		this._cartBtn.textContent = numItemsText;
	}

	checkout() {
		return this.numberOfItems() == 0 ?
			<EmptyCart/> :
			<Contents
				items={this.state.items}
				remove={this.removeItemFromCart.bind(this)}
				handleCheckout={this.handleCheckout}
				updateCartBtn={this.updateCartBtn}
			/>
	}

	render() {
		return (
			<div>
				{this.checkout()}
			</div>
		);
	}
}

class Contents extends React.Component {
	constructor(props) {
		super(props);

		this.token = null;

		this.state = {
			items: []
		};
	}

  // token: null,

  checkoutTotal() {
    return this.props.items.reduce(function(x,y){
      var sum = x.price ? x.price : x;
      sum = parseFloat(sum);
      return sum + parseFloat(y.price);
    },0).toFixed(2);
  }

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
        <div id="checkout-total">Total: ${this.checkoutTotal()}</div>
        <CheckoutForm checkoutTotal={this.checkoutTotal()}/>
      </section>
    )
  }
};

class EmptyCart extends React.Component {
  render() {
    return <div id="empty-cart">Your Cart is Empty!</div>
  }
};
