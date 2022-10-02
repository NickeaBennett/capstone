class ProjectSerializer < ActiveModel::Serializer
  attributes :id, 
          :project_name, 
          :slug,
          :project_description, 
          :image_url,
          :project_website_url, 
          :project_discord_url, 
          :project_twitter_url, 
          :project_opensea_url, 
          :project_max_supply, 
          :project_unit_price_eth, 
          :project_sale_date, 
          :minting_contract_address, 
          :project_blockchain
  
  belongs_to :user
  has_many :reviews
end
