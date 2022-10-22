class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :thumb, :created_at, :user_id, :post_id

  has_one :post
  has_one :user
  # has_many :post
  # has_many :user
end
