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

puts "🌱 Planting Commitment seeds..."

wp1 = Commitment.create( commitment_name: "Working Hours", category_id: 1)
wp2 = Commitment.create( commitment_name: "Commute", category_id: 1)
ssc1 = Commitment.create( commitment_name: "Sleep", category_id: 2)
ssc2 = Commitment.create( commitment_name: "Personal Hygiene", category_id: 2)
ssc3 = Commitment.create( commitment_name: "Leisure Time", category_id: 2)
hw1 = Commitment.create( commitment_name: "Running", category_id: 3)
hw2 = Commitment.create( commitment_name: "Yoga", category_id: 3)
hw3 = Commitment.create( commitment_name: "Meditation", category_id: 3)
hi1 = Commitment.create( commitment_name: "Reading", category_id: 4)
hi1 = Commitment.create( commitment_name: "Reading", category_id: 4)
hi2 = Commitment.create( commitment_name: "Professional Development", category_id: 4)
fsl1 = Commitment.create( commitment_name: "Significant Other", category_id: 5 )
fsl2 = Commitment.create( commitment_name: "Family", category_id: 5)
fsl3 = Commitment.create( commitment_name: "Friends", category_id: 5)
o1 = Commitment.create( commitment_name: "Flex Time", category_id: 6)
o2 = Commitment.create(commitment_name: "Travel", category_id: 6)

puts "✅ Done seeding commitments!"

puts "🌱 Planting budget seeds..."

bc1 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 1, priority: 0, commitment_hours: 40)
bc2 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 2, priority: 1, commitment_hours: 3)

puts "✅ Done seeding budgets!"
