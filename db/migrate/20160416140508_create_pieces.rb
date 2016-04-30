class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.integer :work_id
      t.integer :track_number, :default => 0
      t.string :source_url
      t.string :title
      t.string :duration
      t.date :complete_date
      t.integer :price

      t.timestamps null: false
    end
  end
end
