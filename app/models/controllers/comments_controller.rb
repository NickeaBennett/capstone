class CommentsController < ApplicationController
    
    def index
        comments = find_post.comments
        render json: comments
    end

    def create
        comment = find_post.comments.new(comment_params)
        comment.user_id = @current_user.id
        if comment.save
            render json: comment, status: :created
        else
            render json: { errors: comment.errors }
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:text, :post_id)
    end

    def find_post
        Post.find(params[:post_id])
    end

end
