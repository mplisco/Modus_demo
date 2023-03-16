User.destroy_all
Budget.destroy_all
Commitment.destroy_all
Category.destroy_all

puts "🌱 Planting User seeds..."

user1 = User.create(username: "mike123", first_name: "Mike", last_name: "Plisco", email: "mike123@mike.com", password: "mike123")

user2 = User.create(username: "chase123", first_name: "Chase", last_name: "Kim", email: "chase123@josh.com", password: "chase123")

user3 = User.create(username: "ron123", first_name: "Ronald", last_name: "Posthuauer", email: "ron123@ron.com", password: "ron123")

user4 = User.create(username: "rachel123", first_name: "Rachel", last_name: "Jung", email: "rachel123@rachel.com", password: "rachel123")

user5 = User.create(username: "alex123", first_name: "Alex", last_name: "Smith", email: "alex123@malex.com", password: "alex123")

puts "✅ Done seeding users!"


puts "🌱 Planting Category seeds..."

category1 = Category.create(category_name: "Work & Professional")

category2 = Category.create(category_name: "Sleep & Self-Care")

category3 = Category.create(category_name: "Health & Wellness")

category4 = Category.create(category_name: "Hobbies & Interests")

category5 = Category.create(category_name: "Family & Social")

category6 = Category.create(category_name: "Other")

puts "✅ Done seeding categories!"



