class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :score
  belongs_to :project
  belongs_to :user
end
