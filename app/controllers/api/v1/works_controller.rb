module Api
  module V1
    class WorksController < ApplicationController
      def pieces
        work = Work.find(params[:id])
        render json: work
      end
    end
  end
end
