# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def confirm_artist_preview
    artist = Artist.first
    artist.user_confirmation_token = 'test_token'
    artist.save
    email = 'reubenson@gmail.com'
    UserMailer.confirm_artist(artist,email)
  end
end
