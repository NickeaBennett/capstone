class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :text
      t.integer :thumb
      t.belongs_to :post
      t.belongs_to :user

      t.timestamps
    end
  end
end
