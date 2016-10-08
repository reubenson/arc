class Piece < ActiveRecord::Base
  belongs_to :work
  delegate :artist, to: :work
  has_many :lineitems, as: :item
  has_many :carts, through: :lineitems

  def duration_formatted
    time = duration.split(":")
    if time.length == 3
      hours = time[0]
      minutes = time[1]
      seconds = time[2]
      minutes = '0' + minutes if minutes.length == 1
      seconds = '0' + seconds if seconds.length == 1
      [hours,minutes,seconds].join(":")
    else
      minutes = time[0]
      seconds = time[1]
      seconds = '0' + seconds if seconds.length == 1
      [minutes,seconds].join(":")
    end
  end

  def price_string
    '%.2f' % self.price
  end
end
