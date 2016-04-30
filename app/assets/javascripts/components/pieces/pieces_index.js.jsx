var PiecesIndex = React.createClass({

  render: function() {
    return (
      <div class="pieces-container">
        {
          this.props.pieces.map( function(piece) {
            return <PiecesShow piece={piece}/>
          })
        }
      </div>
    )
  }
});
