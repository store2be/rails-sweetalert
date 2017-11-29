class ItemsController < ApplicationController
  def index; end

  def show; end

  def destroy
    flash[:success] = 'The item has been deleted'
    redirect_to root_path
  end
end
