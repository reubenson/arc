class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.integer :artist_id
      t.string :title
      t.date :start_date
      t.date :end_date
      t.text :description
      t.string :image_url
      t.float :price
      t.string :website_url
      t.timestamps null: false
    end
  end
end
