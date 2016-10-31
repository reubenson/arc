class ErrorsController < ApplicationController

  def index
    @errors = Error.all
  end

  def show
  end

  def create
    @error = Error.new(error_params)
    @error.save
    render :nothing => true
  end

  private
    def error_params
      params.require(:error).permit(:origin, :msg)
    end
end
