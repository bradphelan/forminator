ENV["FORMINATOR_ENV"]="production"
require './forminator'
run Sinatra::Application
