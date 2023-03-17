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
bc3 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 3, priority: 2, commitment_hours: 56)
bc4 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 4, priority: 2, commitment_hours: 7)
bc5 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 5, priority: 0, commitment_hours: 5)
bc6 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 6, priority: 3, commitment_hours: 10)
bc7 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 7, priority: 2, commitment_hours: 3)
bc8 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 8, priority: 1, commitment_hours: 2)
bc9 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 9, priority: 0, commitment_hours: 5)
bc10 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 10, priority: 0, commitment_hours: 3)
bc11 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 11, priority: 3, commitment_hours: 10)
bc12 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 12, priority: 3, commitment_hours: 5)
bc13 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 13, priority: 2, commitment_hours: 3)
bc14 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 14, priority: 1, commitment_hours: 20)
bc15 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 15, priority: 1, commitment_hours: 6)

bc1 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 1, priority: 0, commitment_hours: 65)
bc2 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 2, priority: 1, commitment_hours: 5)
bc3 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 3, priority: 2, commitment_hours: 56)
bc4 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 4, priority: 2, commitment_hours: 7)
bc5 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 5, priority: 0, commitment_hours: 5)
bc6 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 6, priority: 3, commitment_hours: 5)
bc7 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 7, priority: 2, commitment_hours: 3)
bc8 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 8, priority: 1, commitment_hours: 2)
bc9 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 9, priority: 0, commitment_hours: 5)
bc10 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 10, priority: 0, commitment_hours: 3)
bc11 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 11, priority: 3, commitment_hours: 10)
bc12 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 12, priority: 3, commitment_hours: 5)
bc14 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 14, priority: 1, commitment_hours: 20)

puts "✅ Done seeding budgets!"
