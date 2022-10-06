class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            UserMailer.with(user: user).welcome_email.deliver_later
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        render json: find_user
    end

    def update
        if find_user.id == @current_user.id
            if find_user.update(user_params)
                render json: find_user
            else
                render json: { errors: user.errors }
            end
        end
    end

    def me
        render json: @current_user
    end

    def follow
        @current_user.followers << find_user
      end
      
    def unfollow
        @current_user.received_follows.find_by(follower_id: find_user.id).destroy
    end

    private

    def user_params
        params.permit(:username, :image_url, :email, :bio, :password, :password_confirmation)
    end

    def find_user
        User.find(params[:id])
    end

end
