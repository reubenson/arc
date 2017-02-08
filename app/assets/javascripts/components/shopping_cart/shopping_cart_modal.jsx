class ShoppingCartModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cartVisible: false
		};
	}

	attachEventHandlers() {
    this.cartButton.addEventListener('click', this.toggleCartView.bind(this));
	}

	componentDidMount() {
		this._cartContainer = document.querySelector('.cart-container');
		this.cartButton = document.getElementById('cart-btn');

		this.attachEventHandlers();
	}

	hideCart() {
		document.body.classList.remove('hide-overflow');
		this.setState({cartVisible: false});
		this._cartContainer.classList.add('hidden');
	}

	toggleCartView() {
		this.state.cartVisible ? this.hideCart() : this.showCart();
	}

	showCart() {
		document.body.classList.add('hide-overflow');
		this.setState({cartVisible: true});
		this._cartContainer.classList.remove('hidden');
	}

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
