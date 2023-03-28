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
wp3 = Commitment.create( commitment_name: "Freelance Hours", category_id: 1)
wp4 = Commitment.create( commitment_name: "Professional Development", category_id: 1)
wp5 = Commitment.create( commitment_name: "Networking", category_id: 1)
wp6 = Commitment.create( commitment_name: "Job Search", category_id: 1)
wp7 = Commitment.create( commitment_name: "Other", category_id: 1)

ssc1 = Commitment.create( commitment_name: "Sleep", category_id: 2)
ssc2 = Commitment.create( commitment_name: "Personal Hygiene", category_id: 2)
ssc3 = Commitment.create( commitment_name: "Relaxation & Leisure", category_id: 2)
ssc4 = Commitment.create( commitment_name: "Self-Care", category_id: 2)
ssc5 = Commitment.create( commitment_name: "Chores & Household", category_id: 2)
ssc6 = Commitment.create( commitment_name: "General Errands", category_id: 2)
ssc7 = Commitment.create( commitment_name: "Other", category_id: 2)

hw1 = Commitment.create( commitment_name: "Running", category_id: 3)
hw2 = Commitment.create( commitment_name: "Yoga", category_id: 3)
hw3 = Commitment.create( commitment_name: "Meditation & Mindfullness", category_id: 3)
hw4 = Commitment.create( commitment_name: "Therapy", category_id: 3)
hw5 = Commitment.create( commitment_name: "Medical", category_id: 3)
hw6 = Commitment.create( commitment_name: "Walking", category_id: 3)
hw7 = Commitment.create( commitment_name: "Strength Training", category_id: 3)
hw8 = Commitment.create( commitment_name: "Pilates", category_id: 3)
hw9 = Commitment.create( commitment_name: "Bike Riding", category_id: 3)
hw10 = Commitment.create( commitment_name: "HIIT Training", category_id: 3)
hw11 = Commitment.create( commitment_name: "Martial Arts", category_id: 3)
hw12 = Commitment.create( commitment_name: "Swimming", category_id: 3)
hw13 = Commitment.create( commitment_name: "Skiing", category_id: 3)
hw14 = Commitment.create( commitment_name: "Hiking", category_id: 3)
hw15 = Commitment.create( commitment_name: "Other", category_id: 3)

hi1 = Commitment.create( commitment_name: "Reading", category_id: 4)
hi2 = Commitment.create( commitment_name: "Learning & Development", category_id: 4)
hi3 = Commitment.create( commitment_name: "Cooking", category_id: 4)
hi4 = Commitment.create( commitment_name: "Video Gaming", category_id: 4)
hi5 = Commitment.create( commitment_name: "Social Networking", category_id: 4)
hi6 = Commitment.create( commitment_name: "Television & Entertainment", category_id: 4)
hi7 = Commitment.create( commitment_name: "Music", category_id: 4)
hi8 = Commitment.create( commitment_name: "Arts & Crafts", category_id: 4)
hi9 = Commitment.create( commitment_name: "Foreign Language", category_id: 4)
hi10 = Commitment.create( commitment_name: "Other", category_id: 4)

fsl1 = Commitment.create( commitment_name: "Significant Other", category_id: 5 )
fsl2 = Commitment.create( commitment_name: "Family", category_id: 5)
fsl3 = Commitment.create( commitment_name: "Friends", category_id: 5)
fsl4 = Commitment.create( commitment_name: "Dependent Care", category_id: 5)
fsl5 = Commitment.create( commitment_name: "Pet Care", category_id: 5)
fsl6 = Commitment.create( commitment_name: "Dating", category_id: 5)
fsl7 = Commitment.create( commitment_name: "Other", category_id: 5)


o1 = Commitment.create( commitment_name: "Flex Time", category_id: 6)
o2 = Commitment.create( commitment_name: "Travel", category_id: 6)
o3 = Commitment.create( commitment_name: "Other", category_id: 6)

puts "✅ Done seeding commitments!"

puts "🌱 Planting budget seeds..."

bc1 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 1, priority: 0, commitment_hours: 40)
bc2 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 2, priority: 1, commitment_hours: 3)
bc3 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 8, priority: 2, commitment_hours: 56)
bc4 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 9, priority: 2, commitment_hours: 7)
bc5 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 10, priority: 0, commitment_hours: 5)
bc6 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 15, priority: 3, commitment_hours: 10)
bc7 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 16, priority: 2, commitment_hours: 3)
bc8 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 17, priority: 1, commitment_hours: 2)
bc9 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 30, priority: 0, commitment_hours: 5)
bc10 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 31, priority: 0, commitment_hours: 3)
bc11 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 41, priority: 3, commitment_hours: 10)
bc12 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 42, priority: 3, commitment_hours: 5)
bc13 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 43, priority: 2, commitment_hours: 3)
bc14 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 48, priority: 1, commitment_hours: 20)
bc15 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 49, priority: 1, commitment_hours: 6)

bc1 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 1, priority: 0, commitment_hours: 65)
bc2 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 2, priority: 1, commitment_hours: 5)
bc3 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 8, priority: 2, commitment_hours: 56)
bc4 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 9, priority: 2, commitment_hours: 7)
bc5 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 10, priority: 0, commitment_hours: 5)
bc6 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 15, priority: 3, commitment_hours: 5)
bc7 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 16, priority: 2, commitment_hours: 3)
bc8 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 17, priority: 1, commitment_hours: 2)
bc9 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 30, priority: 0, commitment_hours: 5)
bc10 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 31, priority: 0, commitment_hours: 3)
bc11 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 41, priority: 3, commitment_hours: 10)
bc12 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 42, priority: 3, commitment_hours: 5)
bc14 = Budget.create(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 48, priority: 1, commitment_hours: 20)

puts "✅ Done seeding budgets!"
