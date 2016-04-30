# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160416140624) do

  create_table "artists", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "slug"
    t.text     "bio"
    t.date     "birth_date"
    t.date     "death_date"
    t.string   "image_url"
    t.string   "website_url"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string   "subject_type"
    t.integer  "subject_id"
    t.text     "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "pieces", force: :cascade do |t|
    t.integer  "work_id"
    t.integer  "track_number",  default: 0
    t.string   "source_url"
    t.string   "title"
    t.string   "duration"
    t.date     "complete_date"
    t.integer  "price"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "works", force: :cascade do |t|
    t.integer  "artist_id"
    t.string   "title"
    t.date     "start_date"
    t.date     "end_date"
    t.text     "description"
    t.string   "image_url"
    t.float    "price"
    t.string   "website_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

end
