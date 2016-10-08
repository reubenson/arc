class Artist < ActiveRecord::Base
  has_many :works
  has_many :pieces, through: :works
  has_one :note
  belongs_to :user
  extend FriendlyId
  friendly_id :fullname, use: :slugged

  def fullname
    "#{first_name} #{last_name}"
  end

end
