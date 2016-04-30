class Work < ActiveRecord::Base
  belongs_to :artist
  has_many :pieces
  has_one :note
end
