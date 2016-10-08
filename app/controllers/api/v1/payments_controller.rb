module Api
  module V1
    class PaymentsController < ApplicationController

      def get_token
        braintree_token = Braintree::ClientToken.generate

        csrf_meta_string = render_to_string partial: 'payments/csrf'
        csrf_token = csrf_meta_string.split('=')[4].tr('\"','')
        render json: {token: braintree_token, csrf_token: csrf_token}
      end

      def checkout
        nonce = params[:payment_method_nonce]
        transaction_amount = params[:transaction_amt]
        result = Braintree::Transaction.sale(
          :amount => transaction_amount,
          :payment_method_nonce => nonce,
          :options => {
            :submit_for_settlement => true
          }
        )

        if result.methods.include?(:errors)
          render json: {status: result.errors, message: "Your order has failed"}
        else
          @cart = Cart.find(session[:cart_id])
          @cart.transaction_completed = true

          # assign cart to user if signed in
          @cart.user = current_user if current_user
          @cart.save

          downloads = []
          # match download links to cart items

          session[:cart_id] = nil
          render json: {status: result.transaction.status, message: "Your order is complete!", items: [], downloads: downloads}
        end
      end

    end
  end
end
