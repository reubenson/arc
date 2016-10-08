class AdminController < ApplicationController
  # before_action :set_artist, only: [:show, :edit, :update, :destroy]
  layout :pjaxify, only: [:show]
  protect_from_forgery except: :confirm_artist

  def confirm_artist_email
    # Context: An artist is unconnected to a user account
    # artist confirmation procedure:
    #   1) admin enters artist's email address on form
    #   2) email is sent to artist, with a button/form (with csrf token) to confirm the connection between the email address and instance of the artist model
    #     a) if the email recepient has not already created an account on the platform, they must do so first
    #   3) when artist submits confirmation, artist.user is set to the user with the assigned email address
    #     a) submission is denied without a csrf token in the post request
    artist = Artist.find(params[:artist_id])
    artist.user_confirmation_token = form_authenticity_token
    artist.save
    email = params[:email]
    UserMailer.confirm_artist(artist,email).deliver_now
    redirect_to action: 'show'
  end

  def confirm_artist
    artist = Artist.find(params[:artist_id])
    if artist.user_confirmation_token == params[:confirmation_token]
      user = User.find_by(email: params[:email])
      artist.user = user
      artist.save
      debugger
    else
      debugger
    end
    redirect_to action: 'show'
  end

  def show
    @unconfirmed_artists = Artist.where("user_id": nil)
    @confirmed_artists = Artist.where("user_id is not null" )
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_artist
    #   @artist = Artist.friendly.find(params[:id])
    # end

    # Never trust parameters from the scary internet, only allow the white list through.
    # def artist_params
    #   params.require(:artist).permit(:first_name, :last_name, :birth_date, :death_date, :image_url, :user_id)
    # end
end
