var WorksShow = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    startDate: React.PropTypes.string,
    endDate: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    price: React.PropTypes.node,
    websiteUrl: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.work.title}</div>
        <div>Start Date: {this.props.work.start_date}</div>
        <div>End Date: {this.props.work.end_date}</div>
        <div>Image Url: {this.props.work.image_url}</div>
        <div>Price: {this.props.work.price}</div>
        <div>Website Url: {this.props.work.website_url}</div>
      </div>
    );
  }

});
