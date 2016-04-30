class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :first_name
      t.string :last_name
      t.string :slug
      t.text :bio
      t.date :birth_date
      t.date :death_date
      t.string :image_url
      t.string :website_url
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
