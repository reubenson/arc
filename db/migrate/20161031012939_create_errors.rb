class CreateErrors < ActiveRecord::Migration
  def change
    create_table :errors do |t|
      t.string :msg
      t.string :origin
      t.timestamps null: false
    end
  end
end
