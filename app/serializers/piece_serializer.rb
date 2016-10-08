class PieceSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title, :description, :duration, :price, :track_number, :work_id, :source_url, :complete_date, :work_url, :artist_name, :artist_url, :work_title, :type

  def work_url
    artist_work_path(object.artist, object.work)
  end

  def artist_name
    object.artist.fullname
  end

  def artist_url
    artist_path(object.artist)
  end

  def duration
    time = object.duration.split(":")
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

  def work_title
    object.work.title
  end

  def type
    object.class.name
  end

  def price
    '%.2f' % object.price
  end
end
