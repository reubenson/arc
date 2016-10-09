Contributing to the project
====

Prerequisites for this project include: Ruby, Rails, and Postgres

## Workflow for new contributors

1. Clone project
2. Make a new branch
3. Run `bundle install`
4. Run `rake db:migrate`
5. Run `rake db:seed`
6. Run `rails s` to start your local server
7. Commit changes to your branch and push to origin/master

## Notes
The database modeling is roughly as follows: An artist has works, and each work is comprised of pieces. The goal is to generate a variety of layouts to suit a variety of needs. Currently, there are two layouts being developed - `squareformat`([html](https://github.com/reubenson/arc/blob/master/app/views/works/show/squareformat.html.erb) and ([scss](https://github.com/reubenson/arc/blob/master/app/assets/stylesheets/works/squareformat.scss)) and `wideformat`([html](https://github.com/reubenson/arc/blob/master/app/views/works/show/wideformat.html.erb) and [scss](https://github.com/reubenson/arc/blob/master/app/assets/stylesheets/works/wideformat.scss)).
