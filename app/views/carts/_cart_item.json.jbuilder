json.array!(@items) do |item|
  json.extract! item, :id, :track_number, :title, :duration, :price
  json.item_type @item_type
  json.lineitem_id @lineitem.id
end
