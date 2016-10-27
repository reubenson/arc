var Cart = React.createClass({
  _cartContainer: null,
  _cartBtn: null,
  _checkoutForm: null,

  attachEventHandlers: function() {
    this._cartBtn.addEventListener('click', this.toggleCartView);
    document.body.addEventListener('click', this.handleClick);
  },

  componentDidMount: function() {
    this.url = window.location.origin;
    this._cartContainer = document.querySelector('.cart-container');
    this._cartBtn = document.getElementById('cart-btn');
    this._checkoutForm = document.getElementById('checkout');

    this.attachEventHandlers();

    var url = this.url + '/api/v1/initialize_cart';
    this.serverRequest = $.get(url, function (result) {
      this.setState({items: result.carts});
      this.updateCartBtn();
    }.bind(this))
  },

  componentWillUnmount: function() {
    debugger;
    this.serverRequest.abort();
  },

  getInitialState: function(){
    return {
      items: [],
      cartVisible: false
    }
  },

  handleCheckout: function(params) {
    var url = window.location.origin + '/api/v1/checkout';
    this.serverRequest = $.post(url, params, function(result) {
      alert(result.message);
      this.setState({items: result.items});
      this.updateCartBtn();
    }.bind(this));

  },

  handleClick: function(e) {
    if (e.target.classList.contains('add-work-to-cart-btn')) {
      this.addWorkToCart(e);
    } else if (e.target.classList.contains('add-piece-to-cart-btn')) {
      this.addPieceToCart(e);
    } else if (e.target.classList.contains('navbar-link')) {
      if (this.state.cartVisible && e.target.id!='cart-btn') {
        this.hideCart();
      }
    }
  },

  hideCart: function() {
    this.setState({cartVisible: false});
    this._cartContainer.classList.add('hidden');
  },

  toggleCartView: function() {
    this.state.cartVisible ? this.hideCart() : this.showCart();
  },

  addWorkToCart: function(e) {
    var _work = findParentElement(e,'work');
    var workId = _work.dataset.workid;
    var url = this.url + '/api/v1/add_to_cart?WorkId=' + workId;
    this.serverRequest = $.post(url, function (result) {
      this.setState({
        items: result.carts,
      });
      this.updateCartBtn();
    }.bind(this));
  },

  addPieceToCart: function(e) {
    var _piece = findParentElement(e,'piece');
    var pieceId = _piece.dataset.pieceid;
    var url = this.url + '/api/v1/add_to_cart?PieceId=' + pieceId;
    this.serverRequest = $.post(url, function(result) {
      this.setState({
        items: result.carts,
      });
      this.updateCartBtn();
    }.bind(this));
  },

  removeItemFromCart: function(e) {
    var itemType = e.target.dataset.itemType;
    var itemId = e.target.dataset.itemId;
    var url = this.url + '/api/v1/remove_from_cart?item_id=' + itemId + '&item_type=' + itemType;
    this.serverRequest = $.post(url, function(result) {
      this.setState({
        items: result.carts
      })
      this.updateCartBtn();
    }.bind(this));
  },

  numberOfItems: function() {
    return this.state.items.length;
  },

  showCart: function() {
    this.setState({cartVisible: true});
    this._cartContainer.classList.remove('hidden');
  },

  updateCartBtn: function() {
    var numItems = this.numberOfItems(),
      numItemsText = ( numItems > 0 ) ? 'Cart (' + numItems + ')' : 'Cart';

    this._cartBtn.textContent = numItemsText;
  },

  checkout: function() {
    return this.numberOfItems() == 0 ?
      <EmptyCart/> : <Checkout items={this.state.items} remove={this.removeItemFromCart} handleCheckout={this.handleCheckout} updateCartBtn={this.updateCartBtn}/>
  },

  render: function() {
    return (
      <span>
        {this.checkout()}
        <button onClick={this.toggleCartView} className="cart-close-btn">Close Cart</button>
      </span>
    );
  }
});

var Checkout = React.createClass({
  token: null,

  checkoutTotal: function() {
    return this.props.items.reduce(function(x,y){
      var sum = x.price ? x.price : x;
      sum = parseFloat(sum);
      return sum + parseFloat(y.price);
    },0).toFixed(2);
  },

  componentDidMount: function() {
    var url = window.location.origin + '/api/v1/get_token'
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
  },

  handleSubmit: function(e) {
    var params = {
      payment_method_nonce: e.nonce,
      transaction_amt: this.checkoutTotal(),
      csrf_token: this.csrf
    }
    this.props.handleCheckout(params);
  },

  render: function() {
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
              return <Lineitem key={item.type + item.id } item={item} remove={remove}/>
            })}
          </tbody>
        </table>
        <div id="checkout-total">Total: ${this.checkoutTotal()}</div>
        <CheckoutForm checkoutTotal={this.checkoutTotal()}/>
      </section>
    )
  }
});

var EmptyCart = React.createClass({
  render: function() {
    return <div id="empty-cart">Your Cart is Empty!</div>
  }
});

var CheckoutForm = React.createClass({
  render: function() {
    return (
      <form id="checkout" action="/checkout" method='post'>
        <div id="payment-form"></div>
        <input type="hidden" name="transaction_amt" value={this.props.checkoutTotal}/>
        <input type="submit" name="transaction_amt" value={"Pay $" + this.props.checkoutTotal}/>
      </form>
    )
  }
});


var Lineitem = React.createClass({
  handleClick: function(obj) {
    this.props.remove(obj);
  },

  itemType: function() {
    return this.props.item.work_id ? 'Piece' : 'Work';
  },

  render: function() {
    return (
      <tr>
        <td> <a href="#" onClick={this.handleClick} data-item-id={this.props.item.id} data-item-type={this.itemType()}>x</a> </td>
        <td> {this.props.item.artist_name} </td>
        <td> {this.props.item.title} </td>
        <td> ${this.props.item.price} </td>
      </tr>
    )
  }
})
