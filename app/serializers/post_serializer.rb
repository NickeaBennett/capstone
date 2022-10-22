class PostSerializer < ActiveModel::Serializer
  attributes :id, :text, :image_url, :title, :likes, :comments, :artworks

  has_many :comments
  has_many :artworks
  has_one :user
end
