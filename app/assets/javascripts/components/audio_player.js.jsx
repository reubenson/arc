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
  getInitialState: function(){
    return {
      isPlaying: false,
      elapsedTime: 0,
      trackDuration: "",
      currentSource: "",
      currentArtist: "",
      currentArtistUrl: "",
      currentWork: "",
      currentWorkUrl: ""
    }
  },

  togglePlay: function() {
    this.setState({isPlaying: !this.state.isPlaying});
    this.refs.audio.toggleVolume(this.state.isPlaying);
    this.state.isPlaying ? this.resumeTimer() : this.pauseTimer();
  },

  fullName: function() {
    return [this.props.artist.first_name, this.props.artist.last_name].join(' ');
  },

  tick: function() {
    this.setState( {elapsedTime: this.state.elapsedTime + 1} );
  },

  handleClick: function(e) {
    e.target.classList.contains('fa-play') && this.handlePlay(e);
  },

  handlePlay: function(e) {
    var pieceId = e.target.dataset.pieceid;
    var url = window.location.origin + '/pieces/' + pieceId;
    this.serverRequest = $.get(url, function (result) {
      this.setState({
        currentSource: result.source_url,
        trackDuration: result.duration,
        currentWork: result.work,
        currentWorkUrl: result.workUrl,
        currentArtist: result.artistName,
        currentArtistUrl: result.artistUrl,
        isPlaying: true,
        elapsedTime: 0
      });
      this.refs.audio.loadSource();
      this.clearInterval();
      this.resumeTimer();
    }.bind(this));
  },

  resumeTimer: function() {
    this.setInterval(this.tick, 1000);
  },

  pauseTimer: function() {
    this.clearInterval();
  },

  componentDidMount: function() {
    document.getElementById('main').addEventListener('click', this.handleClick);
  },

  render: function() {
    return (
      <div>
        <a href={this.state.currentArtistUrl}>{this.state.currentArtist}</a> - <a href={this.state.currentWorkUrl}>{this.state.currentWork}</a>
        <TimeDisplay elapsedTime={this.state.elapsedTime} duration={this.state.trackDuration}/>
        <ProgressBar elapsedTime={this.state.elapsedTime} duration={this.state.trackDuration}/>
        <PlayButton togglePlayFn={this.togglePlay} isPlaying={this.state.isPlaying}/>
        <Audio currentSource={this.state.currentSource} isPlaying={this.state.isPlaying} ref="audio" />
      </div>
    );
  }
});

var ProgressBar = React.createClass({
  durationSeconds: function() {
    var hms = this.props.duration.split(":");
    var hours = (hms.length === 3) ? hms[0] : 0;
    var minutes = (hms.length === 3) ? hms[1] : hms[0];
    var seconds = (hms.length === 3) ? hms[2] : hms[1];
    seconds = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    return seconds;
  },

  fractionComplete: function() {
    return this.props.elapsedTime / this.durationSeconds();
  },

  mouseDownHandler: function(e, clientX) {
    console.log(e.clientX);
  },

  mouseUpHandler: function(e) {
  },

  render: function() {
    return (
      <div>
        <svg width="400" height="10">
          <line x1="0" y1="5" x2="800" y2="5" />
          <circle onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler} cx={this.fractionComplete()*400} cy="5" r="4" />
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

    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    hours = hours > 0 ? hours + ":" : "";
    return hours + minutes + ':' + seconds;
  },

  render: function() {
    return (
        <div>{this.currentTime()}|{this.props.duration}</div>
    )
  }
});

var Audio = React.createClass({
  toggleVolume: function(isPlaying) {
    var node = this.getDOMNode();
    isPlaying ? node.pause() : node.play();
  },

  loadSource: function() {
    var node = this.getDOMNode();
    node.load();
  },

  render: function() {
    return (
      <audio controls autoPlay>
        <source src={this.props.currentSource} type="audio/mpeg"/>
      </audio>
    )
  }
});

var PlayButton = React.createClass({
  getInitialState: function(){
    return {
      isPlaying: false
    }
  },

  displayBtn: function() {
    return this.props.isPlaying ? 'PAUSE' : 'PLAY';
  },

  handleClick: function() {
    this.props.togglePlayFn();
  },

  render: function() {
    return <div onClick={this.handleClick}>{this.displayBtn()}</div>
  }
});
