class Work < ActiveRecord::Base
  belongs_to :artist
  has_many :pieces
  has_one :note
  has_many :lineitems, as: :item
  has_many :carts, through: :lineitems

  extend FriendlyId
  friendly_id :title, use: :slugged

  def duration_in_seconds
    pieces.inject(0) { |sum,piece| sum + piece.duration_in_seconds() }
  end

  def duration_formatted
    duration = duration_in_seconds()
    hours = 0
    minutes = 0
    seconds = 0
    while duration > 3600
      duration -= 3600
      hours += 1
    end
    while duration > 60
      duration -= 60
      minutes += 1
    end
    seconds = duration
    hours = hours.to_s
    minutes = minutes.to_s
    seconds = seconds.to_s
    if hours != '0'
      minutes = '0' + minutes if minutes.length == 1
      seconds = '0' + seconds if seconds.length == 1
      [hours,minutes,seconds].join(":")
    else
      seconds = '0' + seconds if seconds.length == 1
      [minutes,seconds].join("'") + '"'
    end
  end

  def price_formatted
    '%.2f' % self.price
  end

  def release_details
    'Released ' + self.end_date.strftime('%B %d, %Y') + (self.record_label ? " " + self.record_label : "")
  end

end
