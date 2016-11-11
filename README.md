Contributing to the project
====

Prerequisites for this project include: Ruby, Rails, and Postgres

## Workflow for new contributors

1. Clone project
2. Make a new branch
3. Run `bundle install`
4. Run `rake db:create`
5. Run `rake db:migrate`
6. Run `rake db:seed`
7. Run `rails s` to start your local server
8. Commit changes to your branch and push to origin/master

## Workflow for open source contributors

1. Fork project
2. Complete steps 1 - 7 above (under 'Workflow for new contributors').
3. Commit changes to your branch and push to your fork.
4. Create a pull request.

## Notes
The database modeling is roughly as follows: An artist has works, and each work is comprised of pieces. The goal is to generate a variety of layouts to suit a variety of needs. Currently, there are two layouts being developed - `squareformat`([html](https://github.com/reubenson/arc/blob/master/app/views/works/show/squareformat.html.erb) and ([scss](https://github.com/reubenson/arc/blob/master/app/assets/stylesheets/works/squareformat.scss)) and `wideformat`([html](https://github.com/reubenson/arc/blob/master/app/views/works/show/wideformat.html.erb) and [scss](https://github.com/reubenson/arc/blob/master/app/assets/stylesheets/works/wideformat.scss)).
