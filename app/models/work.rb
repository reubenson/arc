class Work < ActiveRecord::Base
  belongs_to :artist
  has_many :pieces
  has_one :note
  has_many :lineitems, as: :item
  has_many :carts, through: :lineitems

  extend FriendlyId
  friendly_id :title, use: :slugged
end
