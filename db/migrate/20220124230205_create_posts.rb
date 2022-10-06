class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :text
      t.string :image_url
      t.integer :likes
      t.belongs_to :user

      t.timestamps
    end
  end
end
