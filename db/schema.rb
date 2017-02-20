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

ActiveRecord::Schema.define(version: 20161031012939) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
    t.string   "user_confirmation_token"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "carts", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "transaction_completed"
  end

  create_table "errors", force: :cascade do |t|
    t.string   "msg"
    t.string   "origin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lineitems", force: :cascade do |t|
    t.integer "cart_id"
    t.integer "item_id"
    t.string  "item_type"
  end

  add_index "lineitems", ["item_type", "item_id"], name: "index_lineitems_on_item_type_and_item_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.string   "subject_type"
    t.integer  "subject_id"
    t.text     "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "pieces", force: :cascade do |t|
    t.integer  "work_id"
    t.integer  "track_number",                          default: 0
    t.string   "source_url"
    t.string   "title"
    t.string   "duration"
    t.date     "complete_date"
    t.decimal  "price",         precision: 6, scale: 2, default: 1.0
    t.text     "description"
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "works", force: :cascade do |t|
    t.integer  "artist_id"
    t.string   "title"
    t.string   "slug"
    t.date     "start_date"
    t.date     "end_date"
    t.text     "description"
    t.text     "image_urls",                           default: [],              array: true
    t.decimal  "price",        precision: 6, scale: 2
    t.string   "website_url"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "layout"
    t.string   "record_label"
    t.text     "credits"
  end

end
