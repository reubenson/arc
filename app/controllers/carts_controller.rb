class CartsController < ApplicationController
  layout :pjaxify, only: [:checkout]

  def checkout
    @cart = Cart.find(session[:cart_id])
    @items =
    @items = @cart.lineitems.map { |e|
      if e.item_type ==  'Piece' # is piece
        # todo - this currently exposes audio url - fix before launch!
        e = PieceSerializer.new(e.item).serializable_hash
      elsif e.item_type == 'Work' # is work
        e = WorkSerializer.new(e.item).serializable_hash
      end
    }
    render :checkout
  end
end
