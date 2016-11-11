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


// PLAYLIST

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



// PROGRESS BAR

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.el = ReactDOM.findDOMNode(this);
  }

  durationSeconds() {
    if (this.props.duration == Infinity) { return }
    var hms = this.props.duration.split(":"),
      hours = (hms.length === 3) ? hms[0] : 0,
      minutes = (hms.length === 3) ? hms[1] : hms[0],
      seconds = (hms.length === 3) ? hms[2] : hms[1];

    seconds = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    return seconds;
  }

  fractionComplete() {
    var progress = this.props.elapsedTime / this.durationSeconds();
    if ( isNaN(progress) ) progress = 0;
    return progress
  }

  mouseDownHandler(e) {
    var pageX = e.pageX,
      progressBar = this.el,
      progressBarRect = progressBar.getBoundingClientRect(),
      left = pageX - progressBarRect.left,
      value = left / progressBar.clientWidth;

    this.props.updateProgress( value * this.durationSeconds() );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.elapsedTime != nextProps.elapsedTime ||
      this.props.isErroring != nextProps.isErroring;
  }

  render() {
    return (
      <div className="audio-player-progress-bar">
        {(this.props.isErroring) ?
          <div className="audio-player-error-message">PLAYBACK ERROR</div>
          :
          <svg onMouseDown={this.mouseDownHandler.bind(this)}>
            <line x1="0" y1="5" x2="400" y2="5" />
            <line className="progress-bar" x1="0" y1="5" x2={this.fractionComplete()*400} y2="5" />
            {/*<circle onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler} cx={this.fractionComplete()*400} cy="5" r="4" />*/}
          </svg>
        }
      </div>
    )
  }
};

ProgressBar.propTypes = {
  isErroring: React.PropTypes.bool,
  updateProgress: React.PropTypes.func,
  elapsedTime: React.PropTypes.number,
  duration: React.PropTypes.string
}


// TIME DISPLAY
class TimeDisplay extends React.Component {
  constructor(props){
    super();
  }

  currentTime() {
    var seconds = this.props.elapsedTime % 60;
    var minutes = parseInt(this.props.elapsedTime / 60);
    var hours = parseInt(minutes / 60);

    if (hours > 0 && minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    hours = hours > 0 ? hours + ":" : "";
    return hours + minutes + ':' + seconds;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.elapsedTime != nextProps.elapsedTime ||
      this.props.duration != nextProps.duration;
  }

  render() {
    return (
      <div className="audio-player-time-display">
        {this.currentTime()} / {this.props.duration}
      </div>
    )
  }
};

TimeDisplay.propTypes = {
  elapsedTime: React.PropTypes.number,
  duration: React.PropTypes.string
}


// AUDIO
class Audio extends React.Component {
  constructor(props){
    super(props);
  }

  attachAudioEventListeners() {
    var reportError = function(e) {
      this.props.updatePlayerState({
        isErroring: true,
        isPlaying: false
      });

      // send error message to some undetermined endpoint
      var url = window.location.origin + '/errors';
      $.post(url, {
        error: {
          error_msg: 'Audio: ' + e.type,
          error_origin: e.target.currentSrc
        }
      })
    }.bind(this);

    this._audio.addEventListener('timeupdate', function(e) {
      this.props.updatePlayerState({
        elapsedTime: Math.floor(this._audio.currentTime)
      });
    }.bind(this));

    this._audio.addEventListener('ended',function(e){
      this.props.incrementTrackNumber();
    }.bind(this));

    this._audio.addEventListener('suspended', function(e) {
      console.log('suspended');
      reportError(e);
    }.bind(this));

    this._audio.addEventListener('error', function(e) {
      console.log('error');
      reportError(e);
    }.bind(this));

    this._audio.addEventListener('canplaythrough', function(){
      this.hasLoaded = true;
    }.bind(this));
  }

  componentDidMount() {
    this._audio = ReactDOM.findDOMNode(this);
    this.attachAudioEventListeners();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSource != this.props.currentSource) {
      this.loadMedia();
    }
    if (prevProps.isPlaying != this.props.isPlaying) {
      this.updateAudioState();
    }
    if (prevProps.elapsedTime != this.props.elapsedTime) {
      this.updatePlayerProgress();
    }
  }

  loadMedia() {
    if (this.props.currentSource.match(/.mp3/)) {
      this.loadMP3();
    }
  }

  loadMP3() {
    this.hasLoaded = false;
    this._audio.load();

    this.props.updatePlayerState({
      isErroring: false,
      isPlaying: true
    });

    window.setTimeout(function() {
      !this.hasLoaded && this.reportError({
        error: {
          msg: 'Audio not loading',
          origin: this.props.currentSource
        }
      })
    }.bind(this), 1000); // too short?
  }

  pauseAudio() {
    var volume = this._audio.volume;
    var volumeControl = setInterval(function(volume) {
      this._audio.volume -= 0.01;
      if (this._audio.volume <= 0.01) {
        this._audio.pause();
        this._audio.volume = 1.0;
        clearInterval(volumeControl);
      }
    }.bind(this),5);
  }

  playAudio() {
    this._audio.play();
  }

  reportError(error) {
    this.props.updatePlayerState({
      isErroring: true,
      isPlaying: false
    });

    var url = window.location.origin + '/errors';
    $.post(url, error);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.currentSource != this.props.currentSource ||
      nextProps.isPlaying != this.props.isPlaying ||
      Math.abs(nextProps.elapsedTime - this.props.elapsedTime) > 2
    )
  }

  updatePlayerProgress() {
    this._audio.currentTime = this.props.elapsedTime;
  }

  updateAudioState() {
    if (this.props.currentSource.match(/.mp3/)) {
      this.updateAudioNode();
    }
  }

  updateAudioNode() {
    this.props.isPlaying ? this.playAudio() : this.pauseAudio();
  }

  render() {
    return (
      <audio autoPlay>
        <source src={this.props.currentSource} type="audio/mpeg"/>
      </audio>
    )
  }
};

Audio.propTypes = {
  updatePlayerState: React.PropTypes.func,
  currentSource: React.PropTypes.string,
  isPlaying: React.PropTypes.bool,
  incrementTrackNumber: React.PropTypes.func,
  elapsedTime: React.PropTypes.number
};


// PLAY BUTTON

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
