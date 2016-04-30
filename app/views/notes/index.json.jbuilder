json.array!(@notes) do |note|
  json.extract! note, :id, :subject_type, :subject_id, :content
  json.url note_url(note, format: :json)
end
