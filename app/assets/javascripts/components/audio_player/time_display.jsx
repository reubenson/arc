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