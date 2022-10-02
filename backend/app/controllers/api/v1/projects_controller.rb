# frozen_string_literal: true

module Api
  module V1
    class ProjectsController < ApiController
      before_action :set_project, only: %i[show edit update destroy]

      # GET /projects or /projects.json
      def index
        @projects = Project.all
        render json: @projects
      end

      # GET /projects/1 or /projects/1.json
      def show
        render json: @project
      end

      # GET /projects/new
      def new
        render json: @project = Project.new
      end

      # GET /projects/1/edit
      def edit
        render json: @project
      end

      # POST /projects or /projects.json
      def create
        @project = Project.new(project_params)

        respond_to do |format|
          if @project.save
            format.html { redirect_to api_v1_project_url(@project), notice: 'Project was successfully created.' }
            format.json { render :show, status: :created, location: @project }
          else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @project.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /projects/1 or /projects/1.json
      def update
        respond_to do |format|
          if @project.update(project_params)
            format.html { redirect_to api_v1_project_url(@project), notice: 'Projects was successfully updated.' }
            format.json { render :show, status: :ok, location: @project }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @project.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /projects/1 or /projects/1.json
      def destroy
        @project.destroy

        respond_to do |format|
          format.html { redirect_to api_v1_projects_url, notice: 'Project was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = Project.find_by_id(params[:id])
        render json: { error: 'Project not found' }, status: :not_found if @project.nil?
      end

      # Only allow a list of trusted parameters through.
      def project_params
        params.require(:project).permit(:project_name, :project_description, :project_website_url, :project_discord_url, :project_twitter_url, :project_opensea_url, :project_max_supply, :project_unit_price_eth, :project_sale_date, :minting_contract_address, :project_blockchain)
      end
    end
  end
end