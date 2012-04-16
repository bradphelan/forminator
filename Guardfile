# A sample Guardfile
# More info at https://github.com/guard/guard#readme

require 'guard/guard'
require 'dedent'

module ::Guard
  class Yaml2json < ::Guard::Guard
    def run_all
    end

    def run_on_change(paths)
      paths.each do |yaml_path|
        require 'json'
        require 'yaml'
        require 'pathname'
        begin
          hash = YAML::load(File.open yaml_path)
          puts yaml_path
          json_path = yaml_path.gsub /\.yaml$/, ".json"
          puts json_path

          puts hash.to_json
          File.open json_path, 'w' do |f|
            f.write hash.to_json
          end
          msg = "#{yaml_path}\n=> #{json_path}"
          ::Guard::Notifier.notify msg, :title => "Guard Yaml2JSON", :image => :success

        rescue StandardError => error
          ::Guard::UI.info "Yaml2JSON Error: #{error.message}"
          msg = """
          #{yaml_path}
          
          #{error.message}
          """.dedent
          ::Guard::Notifier.notify msg, :title => "Guard Yaml2JSON", :image => :failed
        end
      end
    end
  end
end

guard 'coffeescript' do
  watch %r{.+\.coffee$}
end

guard 'yaml2json' do
  watch %r{app/model/.+\.yaml$}
end
