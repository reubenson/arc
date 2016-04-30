class PiecesController < ApplicationController
  before_action :set_artist, only: [:index, :show, :create, :new, :edit, :update, :destroy]
  before_action :set_work, only: [:index, :show, :create, :new, :edit, :update, :destroy]
  before_action :set_piece, only: [:show, :edit, :update, :destroy]
  layout :pjaxify, only: [:index, :show]

  # temporary route
  def api
    @piece = Piece.find(params[:id])
  end

  def index
    @pieces = @work.pieces
    # render component: 'PiecesIndex', props: {artist: @artist, work: @work, pieces: @pieces}, tag: 'div', class: 'pieces-index'
  end

  def show
    # render component: 'PiecesShow', props: {artist: @artist, work: @artist.work, piece: @piece}, tag: 'div', class: 'pieces-show'
  end

  def new
    @piece = Piece.new
  end

  def edit
  end

  def create
    @piece = @work.pieces.new(piece_params)

    respond_to do |format|
      if @piece.save
        format.html { redirect_to [@artist,@work,@piece], notice: 'Piece was successfully created.' }
        format.json { render :show, status: :created, location: @piece }
      else
        format.html { render :new }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @piece.update(piece_params)
        format.html { redirect_to [@artist,@work,@piece], notice: 'Piece was successfully updated.' }
        format.json { render :show, status: :ok, location: @piece }
      else
        format.html { render :edit }
        format.json { render json: @piece.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @piece.destroy
    respond_to do |format|
      format.html { redirect_to pieces_url, notice: 'Piece was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_piece
      @piece = @work.pieces.find(params[:id])
    end

    # def set_artist
    #   @artist = Artist.find(params[:artist_id])
    # end

    def set_work
      @work = @artist.works.find(params[:work_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def piece_params
      params.require(:piece).permit(:work_id, :track_number, :title, :duration, :complete_date, :price)
    end
end
