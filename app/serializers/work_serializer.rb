class WorkSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title, :artist_name, :price, :type
  has_many :pieces
  # has_many :albums
  # has_many :songs

  def artist_name
    object.artist.fullname
  end

  def type
    object.class.name
  end

  def price
    '%.2f' % object.price
  end
end
