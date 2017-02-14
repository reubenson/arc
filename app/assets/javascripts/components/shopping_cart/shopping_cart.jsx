class ShoppingCart extends React.Component {
	constructor(props) {
		super();

		this.state = {
			items: props.items || [],
			checkoutTotal: this.calculateCheckoutTotal(props.items || [])
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
		} else if (e.target.classList.contains('remove-item-from-cart-btn')) {
      this.removeItemFromCart(e);
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

console.log('remove item from cart');

		this.serverRequest = $.post(url, function(result) {
			this.setState({
				items: result.carts
			});
			this.updateCartBtn();
		}.bind(this));
	}

	numberOfItems() {
		return this.state.items.length;
	}

	componentDidUpdate() {
		this.updateCheckoutTotal();
	}

	calculateCheckoutTotal(items) {
		return items.reduce(function(x,y){
			var sum = x.price ? x.price : x;
			sum = parseFloat(sum);
			return sum + parseFloat(y.price);
		},0).toFixed(2);
	}

	updateCheckoutTotal() {
		var checkoutTotal = this.calculateCheckoutTotal(this.state.items);

		if (this.state.checkoutTotal != checkoutTotal) {
			this.setState({
				checkoutTotal: checkoutTotal
			});
		}
	}

	updateCartBtn() {
		var numItems = this.numberOfItems(),
			numItemsText = ( numItems > 0 ) ? 'Cart (' + numItems + ')' : 'Cart';

		this._cartBtn.textContent = numItemsText;
	}

	checkout() {
		return this.numberOfItems() == 0 ?
			<EmptyShoppingCart/> :
			<ShoppingCartContents
				items={this.state.items}
				remove={this.removeItemFromCart.bind(this)}
				handleCheckout={this.handleCheckout}
				updateCartBtn={this.updateCartBtn}
				checkoutTotal={this.state.checkoutTotal}
			/>
	}

	render() {
		return (
      <div className='shopping-cart'>
        <h3 className="shopping-cart-header">Shopping Cart</h3>
        {this.checkout()}
        <CheckoutForm checkoutTotal={this.state.checkoutTotal}/>
      </div>
    );
	}
}
