class PlayButton extends React.Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isPlaying != nextProps.isPlaying ||
      this.props.piece != nextProps.piece;
  }

  componentDidUpdate() {
    var evt = new CustomEvent('audio:updated',
      {'detail':
        {
          'pieceId': this.props.piece.id,
          'isPlaying': this.props.isPlaying
        }
      });
    window.dispatchEvent( evt );
  }

  displayBtn() {
    return this.props.isPlaying ? 'PAUSE' : 'PLAY';
  }

  handleClick() {
    this.props.togglePlay();
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>{this.displayBtn()}</button>
  }
};

PlayButton.propTypes = {
  togglePlay: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
  piece: React.PropTypes.object
}