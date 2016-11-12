class Playlist extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPiece: null,
      artistUrl:    null,
      artistName:   null,
      workUrl:      null,
      title:        null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPiece: nextProps.piece,
      artistUrl:    nextProps.piece.artist_url,
      artistName:   nextProps.piece.artist_name,
      workUrl:      nextProps.piece.work_url,
      title:        nextProps.piece.title
    });
  }

  render () {
    return (
      <div className="audio-player-info">
        <div className="audio-player-info-artist">
          <a href={this.state.artistUrl}>{this.state.artistName}</a>
        </div>
        <div className="audio-player-info-title">
          <a href={this.state.workUrl}>{this.state.title}</a>
        </div>
      </div>
    )
  }
};

Playlist.propTypes = {
  playlist: React.PropTypes.array,
  trackNumber: React.PropTypes.number
}