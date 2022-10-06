class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :thumb, :created_at, :user_id

  has_one :post
  has_one :user
end
