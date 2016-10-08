class Lineitem < ActiveRecord::Base
  belongs_to :cart
  belongs_to :item, polymorphic: true

  validates :item_id, presence: true
  validates :item_type, presence: true
end
