class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :name
      t.references :imageable, polymorphic: true

      t.timestamps
    end
  end
end
