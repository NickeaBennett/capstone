class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.string :project_description
      t.string :slug
      t.string :image_url
      t.string :project_website_url
      t.string :project_discord_url
      t.string :project_twitter_url
      t.string :project_opensea_url
      t.string :project_max_supply
      t.string :project_unit_price_eth
      t.string :project_sale_date
      t.string :minting_contract_address
      t.string :project_blockchain
      t.boolean :is_verified
      t.boolean :is_premium
      t.boolean :is_featured
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
