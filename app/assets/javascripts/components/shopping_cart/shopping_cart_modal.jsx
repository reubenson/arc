class ShoppingCartModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cartVisible: false
		};
	}

	attachEventHandlers() {
		document.body.addEventListener('click', this.handleClick.bind(this));
	}

	componentDidMount() {
		this._cartContainer = document.querySelector('.cart-container');
		this.attachEventHandlers();
	}

	handleClick(e) {
		// if (e.target.classList.contains('add-work-to-cart-btn')) {
		// 	this.addWorkToCart(e);
		// } else if (e.target.classList.contains('add-piece-to-cart-btn')) {
		// 	this.addPieceToCart(e);
		// }
		if (e.target.classList.contains('navbar-link') && e.target.id === 'cart-btn') {
			this.toggleCartView();
		}
		// if (e.target.classList.contains('navbar-link')) {
		// 	if (this.state.cartVisible && e.target.id!='cart-btn') {
		// 		this.hideCart();
		// 	}
		// }
	}

	hideCart() {
		document.body.classList.remove('hide-overflow');
		this.setState({cartVisible: false});
		this._cartContainer.classList.add('hidden');
	}

	toggleCartView() {
		this.state.cartVisible ? this.hideCart() : this.showCart();
	}

	// addWorkToCart(e) {
	// 	var _work = findParentElement(e.target,'work'),
	// 		workId = _work.dataset.workid,
	// 		url = '/api/v1/add_to_cart?WorkId=' + workId;
	//
	// 	this.serverRequest = $.post(url, function (result) {
	// 		console.log('children', this.props.children);
	// 		this.setState({
	// 			items: result.carts,
	// 		});
	// 		this.updateCartBtn();
	// 	}.bind(this));
	// }

	// addPieceToCart(e) {
	// 	var _piece = findParentElement(e.target,'piece'),
	// 		pieceId = _piece.dataset.pieceid,
	// 		url = '/api/v1/add_to_cart?PieceId=' + pieceId;
	//
	// 	this.serverRequest = $.post(url, function(result) {
	// 		this.setState({
	// 			items: result.carts,
	// 		});
	// 		this.updateCartBtn();
	// 	}.bind(this));
	// }

	// removeItemFromCart(e) {
	// 	var itemType = e.target.dataset.itemType,
	// 		itemId = e.target.dataset.itemId,
	// 		url = '/api/v1/remove_from_cart?item_id=' + itemId + '&item_type=' + itemType;
	//
	// 	this.serverRequest = $.post(url, function(result) {
	// 		this.setState({
	// 			items: result.carts
	// 		})
	// 		this.updateCartBtn();
	// 	}.bind(this));
	// }

	// numberOfItems() {
	// 	return this.state.items.length;
	// }

	showCart() {
		document.body.classList.add('hide-overflow');
		this.setState({cartVisible: true});
		this._cartContainer.classList.remove('hidden');
	}

	// updateCartBtn() {
	// 	var numItems = this.numberOfItems(),
	// 		numItemsText = ( numItems > 0 ) ? 'Cart (' + numItems + ')' : 'Cart';
	//
	// 	this._cartBtn.textContent = numItemsText;
	// }

	render() {
		return (
			<div>
				<ShoppingCart/>
				<a href="/checkout">Go To Checkout</a>
				<button onClick={this.toggleCartView.bind(this)} className="cart-close-btn">Close Cart</button>
			</div>
		);
	}
}
