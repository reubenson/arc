class Playlist extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  artist() {
    var currentItem = this.state.currentPiece,
      artistUrl = currentItem && currentItem.artist_url,
      artistName = currentItem && currentItem.artist_name;

    return (
      <a href={artistUrl}>{artistName}</a>
    )
  }

  piece() {
    var currentItem = this.state.currentPiece,
      workUrl = currentItem && currentItem.work_url;
      workTitle = currentItem && currentItem.title;

    return (
      <a href={workUrl}>{workTitle}</a>
    )
  }

  shouldComponentUpdate(nextProps) {
    var currentPiece = this.props.piece,
      nextPiece = nextProps.piece;

    if (currentPiece != nextPiece) {
      this.state.currentPiece = nextPiece;
    }

    return currentPiece != nextPiece;
  }

  render () {
    return (
      <div className="audio-player-info">
        <div className="audio-player-info-artist">
          {this.artist()}
        </div>
        <div className="audio-player-info-title">
          {this.piece()}
        </div>
      </div>
    )
  }
};

Playlist.propTypes = {
  playlist: React.PropTypes.array,
  trackNumber: React.PropTypes.number
}