# Akademický

## A [Jekyll](https://jekyllrb.com/) theme for academic sites. 

Created by [Eric M. Fink](https://github.com/EricMFink), based on [alshedivat/al-folio](https://github.com/alshedivat/al-folio), using elements from [clayh53/tufte-jekyll](https://github.com/clayh53/tufte-jekyll) (figures, and side/margin notes in the style of [Edward Tufte](https://www.edwardtufte.com/tufte/) and [andhart/bijou](https://github.com/andhart/bijou) (table and button styles)

To use this theme in GitHub Pages, add this line to your site's `_config.yml` file:

```
remote_theme: EricMFink/akademicky
```

## Usage 

### Configuration

Edit ```_config.yml```: 

- Replace ```url:```, ```baseurl:```, ```title:```, and ```description:``` with the applicable information for your site.
- Replace information in ```author:``` block with your name, institutional affiliation, job title, and contact details. 
- Replace information in ```course:``` block with relevant information for your course
- Replace ```~/Git/EricMFink.github.com/``` (in ```transfer:destination```, under ```#deployment```) with your GitHub account. This is used by the ```rakefile``` when building your site and pushing it to the GitHubPages branch. 

Edit ```.yml``` files in ```_data directory``` with the appropriate information for your classes, publications, social networks, and site pages you want to be listed in the navigation menu.

Edit files in ```_layouts``` as desired to modify page styles and content. 

### Building site for hosting on GitHub Pages

To use this theme for a GitHub Pages site, you must publish it from a ```gh-pages``` branch:

1. Commit all changes to ```main``` branch locally and push to remote ```main``` branch to GitHub.
2. Run the ```rakefile```, using ```rake``` command. This will build the site, commit it to the ```gh-pages`` branch locally, and push it to the remote ```gh-pages`` branch on GitHub. 
	- The ```rakefile``` uses information entered under ```deployment``` in your site's ```_config.yml``` file, so be sure you have entered that information correctly. 

### Demos 

#### Personal site with pages for publications and courses taught

[![demo 1](https://img.shields.io/badge/theme-demo-brightgreen.svg)](https://www.emfink.net/ElonLaw/)

#### Course site with pages for syllabus, course materials, and links to external resources

[![demo 2](https://img.shields.io/badge/theme-demo-brightgreen.svg)](https://www.emfink.net/CivilProcedure/)


### License 

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/EricMFink/akademicky/blob/master/LICENSE)