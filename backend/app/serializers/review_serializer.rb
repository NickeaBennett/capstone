class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :score, :project_id, :user_id
  belongs_to :project
  belongs_to :user
end
