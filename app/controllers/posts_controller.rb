class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts
    end

    def show
        render json: find_post
    end

    def create
        post = Post.new(post_params)
        post.user_id = @current_user.id
        if post.save
            render json: post, status: :created
        else
            render json: { errors: post.errors }
        end
    end

    def update
        if user_post.update(post_params)
            render json: post
        else
            render json: { errors: post.errors }
        end
    end

    def destroy
        user_post.delete
        head :no_content
    end

    private

    def post_params
        params.require(:post).permit(:text, :title, :image_url, :likes)
    end
    
    def find_post
        Post.find(params[:id])
    end

    def user_post
        @current_user.posts.find_by(id: params[:id])
    end

end
