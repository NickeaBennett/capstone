class Artwork < ApplicationRecord
    belongs_to :imageable, polymorphic: true
end
