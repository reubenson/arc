# json.extract! @piece, :id, :work_id, :track_number, :title, :duration, :complete_date, :price, :created_at, :source_url
#   @piece.work, :titl
# json.array!(@piece) do |json, branch|
  json.(@piece, :id, :work_id, :track_number, :title, :duration, :complete_date, :price, :created_at, :source_url)
  json.work @piece.work, :title, :artist
# end
# json.piece do
  json.work @piece.work.title
  json.workUrl artist_work_url(@piece.work.artist, @piece.work)
  json.artistName @piece.work.artist.fullname
  json.artistUrl artist_url(@piece.work.artist)

  # json.last_name comment.author.last_name
# end
