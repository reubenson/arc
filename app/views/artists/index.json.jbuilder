json.array!(@artists) do |artist|
  json.extract! artist, :id, :first_name, :last_name, :birth_date, :death_date, :image_url, :user_id
  json.url artist_url(artist, format: :json)
end
