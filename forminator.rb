require 'sinatra'
require "sinatra/reloader" if development?

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['admin', 'nimda']
end

set :static_cache_control, [:public, :max_age => 0]


case ENV["RACK_ENV"] || "development"
when "production"
  puts "Production"
  set :public_folder, "./build/production"
when "testing"
  puts "Production"
  set :public_folder, "./build/testing"
else "development"
  puts "Debug"
  set :public_folder, "./"
end

class Sinatra::Request
  def json_data
    require 'json'
    JSON.parse body.read
  end
end

get "/" do
  redirect "/index.html"
end

get "/forms.json" do
  require 'json'
  require 'yaml'
  content_type :json
  hash = YAML::load File.open "app/model/SampleForms.yaml"
  hash.to_json
end

post "/form.json" do
  require 'json'
  puts request.json_data
end
