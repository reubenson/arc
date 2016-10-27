function findParentElement(e,className) {
  var _el = e.target.parentElement;
  while (!_el.classList.contains(className)) {
    _el = _el.parentElement;
  }
  return _el;
}

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


var AudioPlayer = React.createClass({
  mixins: [SetIntervalMixin],

  decrementTrackNumber: function() {
    var trackNumber = this.state.playlistTrackNumber - 1;
    trackNumber = Math.max(trackNumber , 0);
    this.setState({
      isPlaying: true,
      playlistTrackNumber: trackNumber,
    },function() {
      this.updatePlayer();
    });

  },

  incrementTrackNumber: function() {
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
  },

  closePlayer: function() {
    this.setState({ isPlaying: false })
    this.hidePlayer();
  },

  componentDidMount: function() {
    _audioPlayer = ReactDOM.findDOMNode(this).parentElement;
    document.getElementById('main').addEventListener('click', this.handleClick);
    _audioPlayerBuffer = document.getElementById('audio-player-buffer');
  },

  currentTrackDuration: function() {
    var currentTrack = this.state.playlist[this.state.playlistTrackNumber];
    return currentTrack ? currentTrack.duration : Infinity;
  },

  getInitialState: function(){
    return {
      isVisible: false,
      isPlaying: false,
      elapsedTime: 0,
      currentSource: "",
      playlistTrackNumber: -1,
      playlist: []
    }
  },

  handleClick: function(e) {
    if (e.target.classList.contains('add-piece-to-player-btn')) {
      this.handlePlayPiece(e);
    } else if (e.target.classList.contains('add-work-to-player-btn')) {
      this.handlePlayAllPieces(e);
    }
  },

  handlePlayAllPieces: function(e) {
    this.showPlayer();
    var _work = findParentElement(e,'work');
    var workId = _work.dataset.workid;
    var url = window.location.origin = '/api/v1/works/' + workId + '/pieces';
    this.serverRequest = $.get(url, function (result) {
      this.setState({
        playlist: result.work.pieces,
        playlistTrackNumber: 0,
        isPlaying: true
      }, function() {
        this.updatePlayer();
      });
    }.bind(this));
  },

  handlePlayPiece: function(e) {
    this.showPlayer();
    var _piece = findParentElement(e,'piece');
    var pieceId = _piece.dataset.pieceid;
    var url = window.location.origin = '/api/v1/pieces/' + pieceId;
    this.serverRequest = $.get(url, function (result) {
      var piece = result.piece;
      var prevPiece = this.state.playlist[this.state.playlistTrackNumber];
      var shouldPlay = prevPiece ? (piece.id != prevPiece.id) : true;

      this.setState({
        playlist: [result.piece],
        playlistTrackNumber: 0,
        isPlaying: shouldPlay
      }, function(){
        this.updatePlayer();
      });
    }.bind(this));
  },

  hidePlayer: function() {
    _audioPlayer.setAttribute('aria-hidden', true);
    _audioPlayerBuffer.setAttribute('aria-hidden', true);
  },

  pauseTimer: function() {
    this.clearInterval();
  },

  resetTimer: function() {
    this.clearInterval();
    this.resumeTimer();
  },

  resumeTimer: function() {
    this.setInterval(this.tick, 1000);
  },

  showPlayer: function() {
    _audioPlayer.setAttribute('aria-hidden', false);
    _audioPlayerBuffer.setAttribute('aria-hidden', false);
  },

  tick: function() {
    this.setState( {elapsedTime: this.state.elapsedTime + 1} );
  },

  togglePlay: function() {
    this.state.isPlaying ? this.pauseTimer() : this.resumeTimer();
    this.setState({isPlaying: !this.state.isPlaying});
  },

  updatePlayer: function() {
    var currentPiece = this.state.playlist[this.state.playlistTrackNumber];
    this.setState({
      currentSource: currentPiece.source_url,
      // trackDuration: currentPiece.duration,
      elapsedTime: 0
    });
    this.resetTimer();
  },

  updateProgress: function(val) {
    this.setState({
      elapsedTime: Math.ceil(val)
    })
  },

  render: function() {
    return (
      <div>
        <Playlist playlist={this.state.playlist} trackNumber={this.state.playlistTrackNumber}/>
        <TimeDisplay elapsedTime={this.state.elapsedTime} duration={this.currentTrackDuration()}/>
        <ProgressBar updateProgress={this.updateProgress} elapsedTime={this.state.elapsedTime} duration={this.currentTrackDuration()}/>
        <div className="audio-player-nav-buttons">
          <button onClick={this.decrementTrackNumber}> &#60;&#60; </button>
          <PlayButton togglePlayFn={this.togglePlay} isPlaying={this.state.isPlaying} piece={this.state.playlist[this.state.playlistTrackNumber]} />
          <button onClick={this.incrementTrackNumber}> &#62;&#62; </button>
        </div>
        <Audio currentSource={this.state.currentSource} isPlaying={this.state.isPlaying} incrementTrackNumber={this.incrementTrackNumber} elapsedTime={this.state.elapsedTime} />
        <button onClick={this.closePlayer} className="audio-player-close-btn">x</button>
      </div>
    );
  }
});

var Playlist = React.createClass({
  propTypes: {
    playlist: React.PropTypes.array,
    trackNumber: React.PropTypes.number
  },

  artist: function() {
    var currentItem = this.props.playlist[this.props.trackNumber];
    var artistUrl = currentItem && currentItem.artist_url;
    var artistName = currentItem && currentItem.artist_name;
    return (
      <a href={artistUrl}>{artistName}</a>
    )
  },

  piece: function() {
    var currentItem = this.props.playlist[this.props.trackNumber];
    var workUrl = currentItem && currentItem.work_url;
    var title = currentItem && currentItem.title;
    return (
      <a href={workUrl}>{title}</a>
    )
  },

  shouldComponentUpdate: function(nextProps) {
    return nextProps.trackNumber != this.props.trackNumber;
  },

  render: function() {
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
});

var ProgressBar = React.createClass({
  durationSeconds: function() {
    if (this.props.duration == Infinity) { return }
    var hms = this.props.duration.split(":");
    var hours = (hms.length === 3) ? hms[0] : 0;
    var minutes = (hms.length === 3) ? hms[1] : hms[0];
    var seconds = (hms.length === 3) ? hms[2] : hms[1];
    seconds = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    return seconds;
  },

  fractionComplete: function() {
    var progress = this.props.elapsedTime / this.durationSeconds();
    if ( isNaN(progress) ) progress = 0;
    return progress
  },

  mouseDownHandler: function(e) {
    var pageX = e.pageX,
      progressBar = document.querySelector('.audio-player-progress-bar')
      progressBarRect = progressBar.getBoundingClientRect(),
      left = pageX - progressBarRect.left,
      value = left / progressBar.clientWidth;

    this.props.updateProgress( value * this.durationSeconds() );
  },

  mouseUpHandler: function(e) {
  },

  render: function() {
    return (
      <div className="audio-player-progress-bar">
        <svg onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
          <line x1="0" y1="5" x2="400" y2="5" />
          <line className="progress-bar" x1="0" y1="5" x2={this.fractionComplete()*400} y2="5" />
          {/*<circle onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler} cx={this.fractionComplete()*400} cy="5" r="4" />*/}
        </svg>
      </div>
    )
  }
});

var TimeDisplay = React.createClass({
  currentTime: function() {
    var seconds = this.props.elapsedTime % 60;
    var minutes = parseInt(this.props.elapsedTime / 60);
    var hours = parseInt(minutes / 60);

    if (hours > 0 && minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    hours = hours > 0 ? hours + ":" : "";
    return hours + minutes + ':' + seconds;
  },

  render: function() {
    return (
        <div className="audio-player-time-display">
          {this.currentTime()} / {this.props.duration}
        </div>
    )
  }
});

var Audio = React.createClass({

  attachEndedListener: function() {
    this._audio.addEventListener('ended',function(){
      this.props.incrementTrackNumber();
    }.bind(this));
  },

  componentDidMount: function() {
    this._audio = ReactDOM.findDOMNode(this);
    this.attachEndedListener();
  },

  componentDidUpdate: function(prevProps) {
    if (prevProps.currentSource != this.props.currentSource) {
      this.loadMedia();
    }
    if (prevProps.isPlaying != this.props.isPlaying) {
      this.updatePlayerState();
    }
    if (prevProps.elapsedTime != this.props.elapsedTime) {
      this.updatePlayerProgress();
    }
  },

  loadMedia: function() {
    if (this.props.currentSource.match(/.mp3/)) {
      this.loadMP3();
    }
  },

  loadMP3: function() {
    this._audio.load();
  },

  pauseAudio: function() {
    var volume = this._audio.volume;
    var volumeControl = setInterval(function(volume) {
      this._audio.volume -= 0.01;
      if (this._audio.volume <= 0.01) {
        this._audio.pause();
        this._audio.volume = 1.0;
        clearInterval(volumeControl);
      }
    }.bind(this),5);
  },

  playAudio: function() {
    this._audio.play();
  },

  shouldComponentUpdate: function(nextProps) {
    return (
      nextProps.currentSource != this.props.currentSource ||
      nextProps.isPlaying != this.props.isPlaying ||
      Math.abs(nextProps.elapsedTime- this.props.elapsedTime) > 5
    )
  },

  updatePlayerProgress: function() {
    this._audio.currentTime = this.props.elapsedTime;
  },

  updatePlayerState: function() {
    if (this.props.currentSource.match(/.mp3/)) {
      this.updateAudioNode();
    }
  },

  updateAudioNode: function() {
    this.props.isPlaying ? this.playAudio() : this.pauseAudio();
  },


  render: function() {
    return (
      <audio autoPlay>
        <source src={this.props.currentSource} type="audio/mpeg"/>
      </audio>
    )
  }
});

var PlayButton = React.createClass({
  shouldComponentUpdate: function(nextProps) {
    return this.props.isPlaying != nextProps.isPlaying ||
      this.props.piece != nextProps.piece;
  },

  componentDidUpdate: function() {
    var evt = new CustomEvent('audio:updated',
    {'detail':
      {
        'pieceId': this.props.piece.id,
        'isPlaying': this.props.isPlaying
      }
    });
    window.dispatchEvent( evt );
  },

  displayBtn: function() {
    return this.props.isPlaying ? 'PAUSE' : 'PLAY';
  },

  handleClick: function() {
    this.props.togglePlayFn();
  },

  render: function() {
    return <button onClick={this.handleClick}>{this.displayBtn()}</button>
  }
});
