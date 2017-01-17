class CartsController < ApplicationController
  layout :pjaxify, only: [:checkout]

  # not currently in use, but could be implemented as a complement
  # to the react implementation
  def checkout
    @cart = Cart.find(session[:cart_id])
    render :checkout
  end
end
