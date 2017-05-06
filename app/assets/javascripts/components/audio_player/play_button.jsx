class PlayButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: this.props.isPlaying ? 'pause' : 'play'
    }
  }

componentWillReceiveProps(nextProps) {
    this.setState({
      buttonText: nextProps.isPlaying ? 'pause' : 'play'
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
    return (
      <button onClick={this.handleClick.bind(this)}>
        <i className={'fa fa-' + this.state.buttonText} aria-hidden="true"></i>
      </button>
    )
  }
};

PlayButton.propTypes = {
  togglePlay: React.PropTypes.func,
  isPlaying: React.PropTypes.bool,
  piece: React.PropTypes.object
}
