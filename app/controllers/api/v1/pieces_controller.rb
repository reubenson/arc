module Api
  module V1
    class PiecesController < ApplicationController
      def piece
        piece = Piece.find(params[:id])
        render json: piece
      end
    end
  end
end
