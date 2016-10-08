class UsersController < ApplicationController
  # before_action :set_artist, only: [:show, :edit, :update, :destroy]
  layout :pjaxify, only: [:account]

  def account
    @user = current_user
    purchased_lineitems = Lineitem.joins(:cart)
      .where("carts.transaction_completed": true)
      .where("carts.user_id": @user.id)
    @purchases = purchased_lineitems.map{|lineitem| lineitem.item}
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
