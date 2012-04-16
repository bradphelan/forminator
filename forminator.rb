require 'sinatra'
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'nimda']
end

set :static_cache_control, [:public, :max_age => 0]

case ENV["FORMINATOR_ENV"]
when "production"
  puts "Production"
  set :public_folder, "./build/production"
when "testing"
  puts "Production"
  set :public_folder, "./build/testing"
else
  puts "Debug"
  set :public_folder, "./"
end
