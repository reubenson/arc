json.array!(@works) do |work|
  json.extract! work, :id, :artist_id, :title, :start_date, :end_date, :image_url, :price, :website_url
  json.url work_url(work, format: :json)
end
