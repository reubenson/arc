module Api
  module V1
    class CartsController < ApplicationController
      before_action :set_cart, only: [:initialize_cart, :add_to_cart, :remove_from_cart, :show]

      def add_to_cart
        item_type = 'Work' if params[:WorkId]
        item_type = 'Piece' if params[:PieceId]
        item_id = params[(item_type + 'Id').to_sym]
        if @cart.lineitems.find_by( {item_type: item_type, item_id: item_id } )
          # alert already added to cart
        else
          @cart.lineitems.create( {item_type: item_type, item_id: item_id} )
        end
        render json: @cart.items
      end

      def remove_from_cart
        @lineitem = @cart.lineitems.find_by({item_id: params[:item_id], item_type: params[:item_type]})
        begin
          @lineitem.destroy
        rescue
          debugger
          # sometimes fails??
        end
        render json: @cart.items
      end

      def initialize_cart
        render json: @cart.items
      end

      # def checkout
      # end


      private

        def set_cart
          if session[:cart_id]
            begin
              @cart = Cart.find(session[:cart_id])
            rescue
              @cart = Cart.create()
              session[:cart_id] = @cart.id
            end
          else
            @cart = Cart.create()
            session[:cart_id] = @cart.id
          end
        end

        # Never trust parameters from the scary internet, only allow the white list through.
        # def work_params
        #   params.require(:work).permit(:artist_id, :title, :start_date, :end_date, :image_url, :price, :website_url)
        # end
    end
  end
end
