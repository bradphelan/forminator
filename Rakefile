namespace :build do
  desc "Build the production code"
  task :production do
    sh 'sencha app build -e production'
  end

  desc "Build the testing code"
  task :testing do
    sh 'sencha app build -e testing'
  end

end

namespace :serve do

  desc "Run the producion code"
  task :production do
    ENV['RACK_ENV']='production'
    sh 'ruby forminator.rb'
  end

  desc "Run the testing code"
  task :testing do
    ENV['RACK_ENV']='testing'
    sh 'ruby forminator.rb'
  end

  desc "Run the development code"
  task :development do
    ENV['RACK_ENV']='development'
    sh 'ruby forminator.rb'
  end
end
