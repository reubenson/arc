class UserMailer < ApplicationMailer
  default from: 'notifications@arcprojects.com'
  helper_method :protect_against_forgery?

  def confirm_artist(artist,email)
    @artist = artist
    @email = email

    @url = 'localhost:3000/artists'
    mail(to: email, subject: 'Welcome to My Awesome Site')
  end

  private
    def protect_against_forgery?
      false
    end

end
