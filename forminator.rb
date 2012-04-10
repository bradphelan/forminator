require 'sinatra'
set :public_folder, "./"
set :static_cache_control, :public, :max_age => 1
