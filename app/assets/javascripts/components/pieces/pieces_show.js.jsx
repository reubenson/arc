var PiecesShow = React.createClass({
  // propTypes: {
  //   trackNumber: React.PropTypes.node,
  //   title: React.PropTypes.string,
  //   duration: React.PropTypes.string,
  //   completeDate: React.PropTypes.node,
  //   price: React.PropTypes.node
  // },

  render: function() {
    return (
      <div class="piece-container">
        <div>Track Number: {this.props.piece.track_number}</div>
        <div>Title: {this.props.piece.title}</div>
        <div>Duration: {this.props.piece.duration}</div>
        <div>Complete Date: {this.props.piece.complete_date}</div>
        <div>Price: {this.props.piece.price}</div>
      </div>
    );
  }
});
