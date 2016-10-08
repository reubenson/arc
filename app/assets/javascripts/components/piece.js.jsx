// NOT IN USE

var Piece = React.createClass({
  getInitialState: function() {
    return {
      descriptionIsVisible: false
    }
  },

  handleClick: function(e) {
    // uses similar code to handleclick in audio_player. refactor as singleton or service?
    var _piece = e.target.parentElement;
    while (!_piece.classList.contains('piece')) {
      _piece = _piece.parentElement;
    }
    var pieceId = _piece.dataset.pieceId;
    var url = window.location.origin + '/pieces/' + pieceId;
    this.serverRequest = $.get(url, function (result) {
      debugger
      this.setState({
        descriptionIsVisible: true,
        description: result.description
      })
    }.bind(this))
  },

  show: function() {
    return this.state.descriptionIsVisible ? "Hide Description" : "Read More";
  },

  render: function() {
    var props = this.props;
    return (
      <tr className="piece" data-piece-id={props.piece_id} >
        <td>{props.piece_title} ({props.piece_duration})</td>
        <td><a className="add-piece-to-player-btn">Play</a></td>
        <td><a className="add-piece-to-cart-btn">Add to Cart</a></td>
        <td onClick={this.handleClick}>{this.show()}</td>
      </tr>
    )
  }
});
