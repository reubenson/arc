class Piece < ActiveRecord::Base
  belongs_to :work
  delegate :artist, to: :work
  has_many :lineitems, as: :item
  has_many :carts, through: :lineitems

  def duration_in_seconds
    time = duration_split()
    return time[:hours] * 60 * 60 + time[:minutes] * 60 + time[:seconds]
  end

  def duration_formatted
    time = duration_split()
    hours = time[:hours].to_s
    minutes = time[:minutes].to_s
    seconds = time[:seconds].to_s
    if hours != '0'
      minutes = '0' + minutes if minutes.length == 1
      seconds = '0' + seconds if seconds.length == 1
      [hours,minutes,seconds].join(":")
    else
      seconds = '0' + seconds if seconds.length == 1
      [minutes,seconds].join(":")
    end
  end

  def price_string
    '%.2f' % self.price
  end

  private

  def duration_split
    time = duration.split(":")
    if time.length == 3
      hours = time[0]
      minutes = time[1]
      seconds = time[2]
    else
      hours = 0
      minutes = time[0]
      seconds = time[1]
    end
    return {
      hours: hours.to_i,
      minutes: minutes.to_i,
      seconds: seconds.to_i
    }
  end
end
