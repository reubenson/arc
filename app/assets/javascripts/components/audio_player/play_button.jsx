class PlayButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: this.props.isPlaying ? 'PAUSE' : 'PLAY'
    }
  }

componentWillReceiveProps(nextProps) {
    this.setState({
      buttonText: nextProps.isPlaying ? 'PAUSE' : 'PLAY'
    });
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

  handleClick() {
    this.props.togglePlay();
  }

  shouldComponentUpdate(nextProps) {
    return this.props!== nextProps;
  }

  render() {
    return  <button onClick={this.handleClick.bind(this)}>
              {this.state.buttonText}
            </button>
  }
};

PlayButton.propTypes = {
  togglePlay: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
  piece: React.PropTypes.object
}
