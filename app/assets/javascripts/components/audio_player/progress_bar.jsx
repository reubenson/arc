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