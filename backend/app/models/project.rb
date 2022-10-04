class Project < ApplicationRecord
    belongs_to :user
    has_many :reviews, dependent: :destroy
    has_many :taggables, dependent: :destroy
    # has_many :tags, dependent: :destroy
    # has_many :tags, through: :taggables

    before_create :slugify

    def slugify
        self.slug = project_name.parameterize
        # self.slug = self.project_name.parameterize
    end

    def average_score
        reviews.average(:score).round(2).to_f
    end

end
