require 'sinatra'
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'nimda']
end

set :public_folder, "./"
set :static_cache_control, :public, :max_age => 1
