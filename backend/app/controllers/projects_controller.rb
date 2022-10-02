class ProjectsController < ApplicationController
    include ApplicationHelper
    before_action :set_project, only: %i[show update destroy]
    before_action :authenticate_user!

      # GET /projects or /projects.json
    def index
        @projects = Project.all
    end

    # GET /projects/1 or /projects/1.json
   def show
        @project = Project.find(params[:id])
        render json: @project
    end

    # GET /projects/new
    def new
        @project = Project.new
    end

    # GET /projects/1/edit
    # def edit; end

    # POST /projects or /projects.json
    def create
        @project = Project.new(project_params)

        respond_to do |format|
        if @project.save
            format.html { redirect_to project_url(@project), notice: 'Project was successfully created.' }
            format.json { render :show, status: :created, location: @project }
        else
            format.html { render :new, status: :unprocessable_entity }
            format.json { render json: @project.errors, status: :unprocessable_entity }
        end
        end
    end

    # PATCH/PUT /project/1 or /project/1.json
    def update
        respond_to do |format|
        if @project.update(project_params)
            format.html { redirect_to project_url(@project), notice: 'Project was successfully updated.' }
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
        format.html { redirect_to projects_url, notice: 'Project was successfully destroyed.' }
        format.json { head :no_content }
        end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_project
        @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
        params.require(:project).permit(
            :slug,
            :tags,
            :project_name, 
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

end