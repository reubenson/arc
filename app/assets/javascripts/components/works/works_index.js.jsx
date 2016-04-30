var WorksIndex = React.createClass({
  
  render: function() {
    return (
      <div class="works-container">
        {
          this.props.works.map( function(work) {
            return <WorksShow work={work}/>
          })
        }
      </div>
    );
  }

});
