class LineItem extends React.Component {

  itemType() {
    return this.props.item.work_id ? 'Piece' : 'Work';
  }

  render() {
    return (
      <tr>
        <td> <a href="#"
					onClick={this.props.remove}
					data-item-id={this.props.item.id}
					data-item-type={this.itemType()}>x</a>
				</td>
        <td> {this.props.item.artist_name} </td>
        <td> {this.props.item.title} </td>
        <td> ${this.props.item.price} </td>
      </tr>
    )
  }
};
