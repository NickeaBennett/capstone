class Post < ApplicationRecord

    validates :title, presence: true

    validates :text, presence: true

    belongs_to :user
    has_many :comments, dependent: :destroy

    has_many :artworks, as: :imageable

end
