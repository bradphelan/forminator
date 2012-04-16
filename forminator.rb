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


get "/forms.json" do
  require 'json'
  require 'yaml'
  content_type :json
  hash = YAML::load File.open "app/model/SampleForms.yaml"
  hash.to_json
end
