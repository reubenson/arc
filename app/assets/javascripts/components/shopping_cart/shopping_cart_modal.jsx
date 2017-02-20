class ShoppingCartModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cartVisible: false
		};
	}

	attachEventHandlers() {
    this.navCartButton.addEventListener('click', this.toggleCartView.bind(this));
    this.checkoutButton.addEventListener('click',this.hideCart.bind(this));
	}

	componentDidMount() {
		this.shoppingCartModal = document.querySelector('.shopping-cart-modal');
		this.navCartButton = document.getElementById('cart-btn');
    this.checkoutButton = document.querySelector('.go-to-checkout');

		this.attachEventHandlers();
	}

	hideCart() {
		document.body.classList.remove('hide-overflow');
		this.setState({cartVisible: false});
		this.shoppingCartModal.classList.add('hidden');
	}

	toggleCartView() {
		this.state.cartVisible ? this.hideCart() : this.showCart();
	}

	showCart() {
		document.body.classList.add('hide-overflow');
		this.setState({cartVisible: true});
		this.shoppingCartModal.classList.remove('hidden');
	}

	render() {
    var showCheckoutLink = !!this.navCartButton && this.navCartButton.innerHTML !== 'Cart',
      hidden = showCheckoutLink ? "" : "hidden";

		return (
			<div>
				<ShoppingCart/>
        <a className={"go-to-checkout" + (showCheckoutLink ? '' : ' hidden')} href="/checkout">Go To Checkout</a>
				<button onClick={this.toggleCartView.bind(this)} className="close-cart">Close Cart</button>
			</div>
		);
	}
}
