class Tag < ApplicationRecord
    has_many :taggables, dependent: :destroy
    has_many :projects, through: :taggables
end
