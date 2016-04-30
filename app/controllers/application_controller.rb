class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def pjaxify
    return request.headers['X-PJAX'] ? false : "application"
  end

  def set_artist
    artist_id = params[:artist_id] || params[:id]
    @artist = Artist.friendly.find(artist_id)
  end
end
