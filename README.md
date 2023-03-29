# Modus

Modus allows users to create value-based time budgets to facilitate more intentional time management.

## Github Repo
https://github.com/mplisco/Modus_demo

1. Fork and Clone this repository
2. Run `bundle install` to install all required backend dependency packages
3. Run `npm install --prefix client` to install all required frontend dependency packages
4. Run `rails db:migrate` to migrate database models and attributes
5. Run `rails db:seed` for seed data and default time categories and commitments
6. Run `rails s` to start the rails server
7. Run `npm start --prefix client` to start the frontend client

## Technologies
* JavaScript
* React
* Ruby
* Ruby on Rails
* ActiveRecord
* PostgreSQL
* Semantic UI
* CSS

## User Stories
1. A User can create an account
2. A User can login to and logout of thier account
3. A User can view and edit their account
4. A User can deactivate their account
5. A User can create a new time budget from scratch or by using an existing template
6. A User can view all created time budgets on thier home page
7. A User can edit a time budget by adding, removing, or modifying new time commitments
8. A user can delete a time budget

## Server-Side Configuration
### Models
1. A User has many Budgets and has many Commitments through Budgets
2. A Budget belongs to a User and Belongs to a Commitment
3. A Commitment has many Budgets and has many Users through Budgets. A Commitment belongs to a Category.
4. A Category has many Commitments

### ERD



### Model Validations

### Users
* validates **presence** of first_name, last_name, username, email, and password
* validates **format** of email (VALID_EMAIL_REGEX)
* validates **uniqueness** of username and email
* validates **length** of password (between: 8 and 20)

### Budgets
* validates **presence** of user_id, commitment_id, commitment_hours, priority
* validates **numericality of priority (0-3) and commitment)hours (<168)

### Commitments
* validates **presence** of commitment_name and category_id

### Category
* validates **presence of category_name

### API Endpoints

## Client-Side Configuration

### React Routes

### React Component Tree



