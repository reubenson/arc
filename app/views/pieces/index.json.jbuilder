json.array!(@pieces) do |piece|
  json.extract! piece, :id, :work_id, :track_number, :title, :duration, :complete_date, :price
  json.url piece_url(piece, format: :json)
end
