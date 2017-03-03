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

    this._audio.addEventListener('canplaythrough', function() {
      this.hasLoaded = true;

      this.props.updatePlayerState({
        isErroring: false
      });

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

  // Note: Safari is slow to render audio dynamically
  // [https://origin-discussions-us.apple.com/thread/6886071]
  loadMP3() {
    this.hasLoaded = false;
    this._audio.load();
    this._audio.play();

    // report error if audio hasn't loaded within 10 seconds
    window.setTimeout(function() {
      !this.hasLoaded && this.reportError({
        error: {
          msg: 'Audio not loading',
          origin: this.props.currentSource
        }
      });
    }.bind(this), 10000);
  }

  pauseAudio() {
    // iOS disallows volume set dynamically
    // https://www.ibm.com/developerworks/library/wa-ioshtml5/
    var volumeCanBeSetDynamically = false,
      test = this._audio.volume -= 0.01,
      volumeCanBeSetDynamically = this._audio.volume === test;

    if (volumeCanBeSetDynamically) {
      var volumeControl = setInterval(function(volume) {
        this._audio.volume -= 0.01;
        if (this._audio.volume <= 0.01) {
          this._audio.pause();
          this._audio.volume = 1.0;
          clearInterval(volumeControl);
        }
      }.bind(this), 5);
    } else {
      this._audio.pause();
    }
  }

  playAudio() {
    this._audio.play();

    this.props.updatePlayerState({
      isPlaying: true
    });
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
