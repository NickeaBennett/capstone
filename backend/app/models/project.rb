class Project < ApplicationRecord
    belongs_to :user
    has_many :reviews, dependent: :destroy

    before_create :slugify

    def slugify
        self.slug = self.project_name.parameterize
    end

    def average_score
        reviews.average(:score).round(2).to_f
    end

end
