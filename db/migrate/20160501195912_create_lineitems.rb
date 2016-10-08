class CreateLineitems < ActiveRecord::Migration
  def change
    create_table :lineitems do |t|
      t.integer :cart_id
      t.references :item, polymorphic: true, index: true
    end
  end
end
