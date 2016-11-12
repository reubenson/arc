var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  },
  clearInterval: function() {
    this.intervals.forEach(clearInterval);
  }
};


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      isPlaying: false,
      isErroring: false,
      elapsedTime: 0,
      currentSource: "",
      playlistTrackNumber: -1,
      playlist: []
    };
  }

  decrementTrackNumber() {
    var trackNumber = this.state.playlistTrackNumber - 1,
      elapsedTime = trackNumber < 0 ? 0 : this.state.elapsedTime;

    this.setState({
      elapsedTime: elapsedTime,
      isPlaying: true,
      playlistTrackNumber: Math.max(trackNumber , 0)
    },function() {
      this.updatePlayer();
    });

    this.updateProgress(0); // reset time to 0
  }

  incrementTrackNumber() {
    var trackNumber = this.state.playlistTrackNumber + 1;
    if (trackNumber >= this.state.playlist.length) {
      this.setState({isPlaying: false});
    } else {
      trackNumber = Math.min(trackNumber , this.state.playlist.length-1);
      this.setState({
        isPlaying: true,
        playlistTrackNumber: trackNumber
      },function() {
        this.updatePlayer();
      });
    }
  }

  closePlayer() {
    this.setState({ isPlaying: false })
    this.hidePlayer();
  }

  componentDidMount() {
    _audioPlayer = ReactDOM.findDOMNode(this).parentElement;
    document.getElementById('main').addEventListener('click', this.handleClick.bind(this));
    _audioPlayerBuffer = document.getElementById('audio-player-buffer');
  }

  currentTrackDuration() {
    var currentTrack = this.state.playlist[this.state.playlistTrackNumber];
    return currentTrack ? currentTrack.duration : "";
  }

  handleClick(e) {
    var playPiece = e.target.classList.contains('add-piece-to-player-btn') ||
      (!e.target.classList.contains('add-piece-to-cart-btn') && findParentElement(e.target, 'piece'));

    if (playPiece) {
      this.handlePlayPiece(e);
    } else if (e.target.classList.contains('add-work-to-player-btn')) {
      this.handlePlayAllPieces(e);
    }
  }

  handlePlayAllPieces(e) {
    this.showPlayer();
    var _work = findParentElement(e.target,'work');
    var workId = _work.dataset.workid;
    var url = '/api/v1/works/' + workId + '/pieces';
    this.serverRequest = $.get(url, function (result) {
      this.setState({
        playlist: result.work.pieces,
        playlistTrackNumber: 0,
        isPlaying: true
      }, function() {
        this.updatePlayer();
      });
    }.bind(this));
  }

  handlePlayPiece(e) {
    this.showPlayer();
    var _piece = findParentElement(e.target,'piece'),
      pieceId = _piece.dataset.pieceid,
      _work = findParentElement(e.target,'work'),
      workId = _work.dataset.workid,
      url = '/api/v1/works/' + workId + '/pieces';

    $.get(url, function (result) {
      var pieces = result.work.pieces,
        piece = pieces[0],
        trackNumber = 0;

      while (piece.id != pieceId) {
        trackNumber++;
        piece = pieces[trackNumber];
      }

      var prevPiece = this.state.playlist[this.state.playlistTrackNumber];
      var shouldPlay = prevPiece ? (piece.id != prevPiece.id || !this.state.isPlaying) : true;

      this.setState({
        playlist: result.work.pieces,
        playlistTrackNumber: trackNumber,
        isPlaying: shouldPlay
      }, function(){
        this.updatePlayer();
      });
    }.bind(this));
  }

  hidePlayer() {
    _audioPlayer.setAttribute('aria-hidden', true);
    _audioPlayerBuffer.setAttribute('aria-hidden', true);
  }

  pauseTimer() {
    this.clearInterval();
  }

  resetTimer() {
    this.clearInterval();
    this.resumeTimer();
  }

  resumeTimer() {
    // this.setInterval(this.tick, 1000);
  }

  showPlayer() {
    _audioPlayer.setAttribute('aria-hidden', false);
    _audioPlayerBuffer.setAttribute('aria-hidden', false);
  }

  tick() {
    this.setState( {elapsedTime: this.state.elapsedTime + 1} );
  }

  togglePlay() {
    // this.state.isPlaying ? this.pauseTimer() : this.resumeTimer();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  updatePlayer() {
    var currentPiece = this.state.playlist[this.state.playlistTrackNumber];
    this.setState({
      currentSource: currentPiece.source_url
      // trackDuration: currentPiece.duration,
      // elapsedTime: 0
    });
    // this.resetTimer();
  }

  // replace updatePlayer with this?
  updatePlayerState(obj) {
    this.setState(obj);
  }

  updateProgress(val) {
    this.setState({
      elapsedTime: Math.floor(val)
    })
  }

  render() {
    return (
      <div>
        <Playlist
          piece = {this.state.playlist[this.state.playlistTrackNumber]}
        />
        <TimeDisplay
          elapsedTime={this.state.elapsedTime}
          duration={this.currentTrackDuration()}
        />
        <ProgressBar
          isErroring = {this.state.isErroring}
          updateProgress = {this.updateProgress.bind(this)}
          elapsedTime = {this.state.elapsedTime}
          duration = {this.currentTrackDuration()}
          />
        <div className="audio-player-nav-buttons">
          <button onClick = {this.decrementTrackNumber.bind(this)}> &#60;&#60; </button>
          <PlayButton
            togglePlay = {this.togglePlay.bind(this)}
            isPlaying = {this.state.isPlaying}
            piece = {this.state.playlist[this.state.playlistTrackNumber]}
          />
          <button onClick = {this.incrementTrackNumber.bind(this)}> &#62;&#62; </button>
        </div>
        <Audio
          updatePlayerState = {this.updatePlayerState.bind(this)}
          currentSource = {this.state.currentSource}
          isPlaying = {this.state.isPlaying}
          incrementTrackNumber = {this.incrementTrackNumber.bind(this)}
          elapsedTime = {this.state.elapsedTime}
        />
        <button onClick={this.closePlayer.bind(this)} className="audio-player-close-btn">x</button>
      </div>
    );
  }
};

AudioPlayer.mixins = [SetIntervalMixin];


