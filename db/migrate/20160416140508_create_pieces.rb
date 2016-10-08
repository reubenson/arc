class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.integer :work_id
      t.integer :track_number, :default => 1
      t.string :source_url
      t.string :title
      t.string :duration
      t.date :complete_date
      t.decimal :price, :precision => 6, :scale => 2
      t.text :description

      t.timestamps null: false
    end
  end
end
