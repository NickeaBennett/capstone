# frozen_string_literal: true

module Api
  module V1
    class ProjectsController < ApiController
      before_action :set_project, only: %i[show edit update destroy]

      # GET /projects or /projects.json
      def index
        @projects = Project.all
        render json: serializer(projects, options).serialized_json
        # render json: ProjectSerializer.new(projects).serialized_json
      end

      # GET /projects/1 or /projects/1.json
      # GET /projects/:slug or /projects/:slug.json
      def show
        project = Project.find_by(slug: params[:slug])
        render json: @project
        # render json: ProjectSerializer.new(@projects).serialized_json
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
        @project = Project.new(project_params.except(:tags))
        create_or_delete_project_tags(@project, params[:project][:tags],)

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
        create_or_delete_project_tags(@project, params[:project][:tags],)
        respond_to do |format|
          if @project.update(project_params.except(:tags))
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

      def create_or_delete_project_tags(project, tags)
        project.taggables.destroy_all
        tags = tags.strip.split(',')
        tags.each do |tag|
          project.tags << Tag.find_or_create_by(name: tag)
        end
      
      end

      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = Project.find_by_id(params[:id])
        render json: { error: 'Project not found' }, status: :not_found if @project.nil?
      end

      # Only allow a list of trusted parameters through.
      def project_params
        params.require(:project).permit(
          :project_name, 
          :slug,
          :project_description, 
          :project_website_url, 
          :project_discord_url, 
          :project_twitter_url, 
          :project_opensea_url, 
          :project_max_supply, 
          :project_unit_price_eth, 
          :project_sale_date, 
          :minting_contract_address, 
          :project_blockchain
        )
      end
      def options
        @options ||= { include: %i[reviews tags] }
      end
    end
  end
end