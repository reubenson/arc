var ArtistShowPage = React.createClass({
  // propTypes: {
  //   artist: {
  //     firstName: React.PropTypes.string,
  //     lastName: React.PropTypes.string,
  //     birthDate: React.PropTypes.string,
  //     deathDate: React.PropTypes.string,
  //     imageUrl: React.PropTypes.string,
  //     websiteUrl: React.PropTypes.string
  //   }
  //   works: React.PropTypes.array
  // },

  fullName: function() {
    return [this.props.artist.first_name, this.props.artist.last_name].join(' ');
  },

  render: function() {
    return (
      <div>
        <div>{this.fullName()}</div>
        <img src="{this.props.artist.image_url}"/>
        <a href="{this.props.artist.website_url}">Personal Website</a>
        <WorksIndex works={this.props.works}/>
      </div>
    );
  }
});
