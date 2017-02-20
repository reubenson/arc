class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|
      t.integer :artist_id
      t.string :title
      t.string :slug
      t.date :start_date
      t.date :end_date
      t.text :description
      t.text :image_urls, array: true, default: []
      t.decimal :price, :precision => 6, :scale => 2
      t.string :website_url
      t.timestamps null: false
      t.string :layout
      t.string :record_label
      t.text :credits
    end
  end
end
