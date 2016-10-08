class WorksController < ApplicationController
  before_action :set_artist, only: [:index, :show, :new, :edit, :update, :destroy]
  before_action :set_work, only: [:show, :edit, :update, :destroy]
  layout :pjaxify, only: [:index, :show, :all]

  def all
    @works = Work.all
    @include_name = true
  end

  def index
    @works = @artist.works.all
    @include_name = false
  end

  def show
    case @work.layout
    when 'squareformat'
      render "works/show/squareformat"
    when 'wideformat'
      render "works/show/wideformat"
    else
      render "works/show/wideformat"
    end
  end

  def new
    @work = Work.new
  end

  def edit
  end

  def create
    @work = @artist.works.new(work_params)
    respond_to do |format|
      if @work.save
        format.html { redirect_to [@artist,@work], notice: 'Work was successfully created.' }
        format.json { render :show, status: :created, location: @work }
      else
        format.html { render :new }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @work.update(work_params)
        format.html { redirect_to [@artist,@work], notice: 'Work was successfully updated.' }
        format.json { render :show, status: :ok, location: @work }
      else
        format.html { render :edit }
        format.json { render json: @work.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @work.destroy
    respond_to do |format|
      format.html { redirect_to works_url, notice: 'Work was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def work_params
      params.require(:work).permit(:artist_id, :title, :start_date, :end_date, :image_url, :price, :website_url)
    end
end
