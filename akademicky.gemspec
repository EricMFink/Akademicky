# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "akademicky"
  spec.version       = "0.1.0"
  spec.authors       = ["Eric M. Fink"]
  spec.email         = ["emfink@gmail.com"]

  spec.summary       = %q{A Jekyll theme for academic websites}
  spec.homepage      = "https://github.com/EricMFink/akademicky"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)}i) }
  
  spec.add_runtime_dependency "jekyll-pandoc", "~> 2.0"

  spec.add_development_dependency "jekyll", "~> 4.3"
  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
