Category.destroy_all
Commitment.destroy_all
Priority.destroy_all
Week.destroy_all

#controlled tables 

puts "🌱 Planting Category seeds..."

category1 = Category.find_or_create_by(category_name: "Work & Professional")

category2 = Category.find_or_create_by(category_name: "Sleep & Self-Care")

category3 = Category.find_or_create_by(category_name: "Health & Wellness")

category4 = Category.find_or_create_by(category_name: "Hobbies & Interests")

category5 = Category.find_or_create_by(category_name: "Family & Social")

category6 = Category.find_or_create_by(category_name: "Other")

puts "✅ Done seeding categories!"


puts "🌱 Planting Commitment seeds..."

wp1 = Commitment.find_or_create_by( commitment_name: "Working Hours", category_id: 1)
wp2 = Commitment.find_or_create_by( commitment_name: "Commute", category_id: 1)
wp3 = Commitment.find_or_create_by( commitment_name: "Freelance Hours", category_id: 1)
wp4 = Commitment.find_or_create_by( commitment_name: "Professional Development", category_id: 1)
wp5 = Commitment.find_or_create_by( commitment_name: "Networking", category_id: 1)
wp6 = Commitment.find_or_create_by( commitment_name: "Job Search", category_id: 1)
wp7 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 1)

ssc1 = Commitment.find_or_create_by( commitment_name: "Sleep", category_id: 2)
ssc2 = Commitment.find_or_create_by( commitment_name: "Personal Hygiene", category_id: 2)
ssc3 = Commitment.find_or_create_by( commitment_name: "Relaxation & Leisure", category_id: 2)
ssc4 = Commitment.find_or_create_by( commitment_name: "Self-Care", category_id: 2)
ssc5 = Commitment.find_or_create_by( commitment_name: "Chores & Household", category_id: 2)
ssc6 = Commitment.find_or_create_by( commitment_name: "General Errands", category_id: 2)
ssc7 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 2)

hw1 = Commitment.find_or_create_by( commitment_name: "Running", category_id: 3)
hw2 = Commitment.find_or_create_by( commitment_name: "Yoga", category_id: 3)
hw3 = Commitment.find_or_create_by( commitment_name: "Meditation & Mindfullness", category_id: 3)
hw4 = Commitment.find_or_create_by( commitment_name: "Therapy", category_id: 3)
hw5 = Commitment.find_or_create_by( commitment_name: "Medical", category_id: 3)
hw6 = Commitment.find_or_create_by( commitment_name: "Walking", category_id: 3)
hw7 = Commitment.find_or_create_by( commitment_name: "Strength Training", category_id: 3)
hw8 = Commitment.find_or_create_by( commitment_name: "Pilates", category_id: 3)
hw9 = Commitment.find_or_create_by( commitment_name: "Bike Riding", category_id: 3)
hw10 = Commitment.find_or_create_by( commitment_name: "HIIT Training", category_id: 3)
hw11 = Commitment.find_or_create_by( commitment_name: "Martial Arts", category_id: 3)
hw12 = Commitment.find_or_create_by( commitment_name: "Swimming", category_id: 3)
hw13 = Commitment.find_or_create_by( commitment_name: "Skiing", category_id: 3)
hw14 = Commitment.find_or_create_by( commitment_name: "Hiking", category_id: 3)
hw15 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 3)

hi1 = Commitment.find_or_create_by( commitment_name: "Reading", category_id: 4)
hi2 = Commitment.find_or_create_by( commitment_name: "Learning & Development", category_id: 4)
hi3 = Commitment.find_or_create_by( commitment_name: "Cooking", category_id: 4)
hi4 = Commitment.find_or_create_by( commitment_name: "Video Gaming", category_id: 4)
hi5 = Commitment.find_or_create_by( commitment_name: "Social Networking", category_id: 4)
hi6 = Commitment.find_or_create_by( commitment_name: "Television & Entertainment", category_id: 4)
hi7 = Commitment.find_or_create_by( commitment_name: "Music", category_id: 4)
hi8 = Commitment.find_or_create_by( commitment_name: "Arts & Crafts", category_id: 4)
hi9 = Commitment.find_or_create_by( commitment_name: "Foreign Language", category_id: 4)
hi10 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 4)

fsl1 = Commitment.find_or_create_by( commitment_name: "Significant Other", category_id: 5 )
fsl2 = Commitment.find_or_create_by( commitment_name: "Family", category_id: 5)
fsl3 = Commitment.find_or_create_by( commitment_name: "Friends", category_id: 5)
fsl4 = Commitment.find_or_create_by( commitment_name: "Dependent Care", category_id: 5)
fsl5 = Commitment.find_or_create_by( commitment_name: "Pet Care", category_id: 5)
fsl6 = Commitment.find_or_create_by( commitment_name: "Dating", category_id: 5)
fsl7 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 5)


o1 = Commitment.find_or_create_by( commitment_name: "Flex Time", category_id: 6)
o2 = Commitment.find_or_create_by( commitment_name: "Travel", category_id: 6)
o3 = Commitment.find_or_create_by( commitment_name: "Other", category_id: 6)

puts "✅ Done seeding commitments!"


puts "🌱 Planting priority seeds..."

Priority.find_or_create_by(priority_name: "Fixed")
Priority.find_or_create_by(priority_name: "High")
Priority.find_or_create_by(priority_name: "Medium")
Priority.find_or_create_by(priority_name: "Low")

puts "✅ Dont planing priority seeds..."

puts "🌱 Planting week seeds..."

start_date = Date.parse("March 27, 2023") # Set the start date
end_date = start_date + 51.weeks # Calculate the end date (51 weeks from start date)

current_date = start_date
52.times do
  week_start = current_date
  week_end = current_date + 6.days
  Week.find_or_create_by(start_date: week_start, end_date: week_end)
  current_date += 7.days
end

puts "✅ Done Planting weeks seeds..."

#Uncontolled tables below

User.destroy_all
Budget.destroy_all
WeeklyInitiative.destroy_all
ProgressLog.destroy_all


puts "🌱 Planting User seeds..."

user1 = User.create(username: "mike123", first_name: "Mike", last_name: "Plisco", email: "mike123@mike.com", password:"mike123")

user2 = User.create(username: "chase123", first_name: "Chase", last_name: "Kim", email: "chase123@josh.com", password:"chase123")

user3 = User.create(username: "ron123", first_name: "Ronald", last_name: "Posthuauer", email: "ron123@ron.com", password:"ron123")

user4 = User.create(username: "rachel123", first_name: "Rachel", last_name: "Jung", email: "rachel123@rachel.com", password:"rachel123")

user5 = User.create(username: "alex123", first_name: "Alex", last_name: "Smith", email: "alex123@malex.com", password:"alex123")

puts "✅ Done seeding users!"


puts "🌱 Planting budget seeds..."

bc1 = Budget.create(budget_name: "Default Time Budget", user_id: 1, commitment_id: 1, priority: 0, priority_id: 1, commitment_hours: 40)
bc2 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 2, priority: 1, priority_id: 2, commitment_hours: 3)
bc3 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 8, priority: 2, priority_id: 3,commitment_hours: 56)
bc4 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 9, priority: 2, priority_id: 3,commitment_hours: 7)
bc5 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 10, priority: 0, priority_id: 1,commitment_hours: 5)
bc6 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 15, priority: 3, priority_id: 4,commitment_hours: 10)
bc7 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 16, priority: 2, priority_id: 3,commitment_hours: 3)
bc8 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 17, priority: 1, priority_id: 2,commitment_hours: 2)
bc9 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 30, priority: 0, priority_id: 1,commitment_hours: 5)
bc10 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 31, priority: 0, priority_id: 1,commitment_hours: 3)
bc11 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 41, priority: 3, priority_id: 4,commitment_hours: 10)
bc12 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 42, priority: 3, priority_id: 4,commitment_hours: 5)
bc13 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 43, priority: 2, priority_id: 3,commitment_hours: 3)
bc14 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 48, priority: 1, priority_id: 2,commitment_hours: 20)
bc15 = Budget.find_or_create_by(budget_name: "Default Time Budget", user_id: 1, commitment_id: 49, priority: 1, priority_id: 2,commitment_hours: 6)

bc1 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 1, priority: 0, priority_id: 1,commitment_hours: 65)
bc2 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 2, priority: 1, priority_id: 2,commitment_hours: 5)
bc3 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 8, priority: 2, priority_id: 3,commitment_hours: 56)
bc4 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 9, priority: 2, priority_id: 3,commitment_hours: 7)
bc5 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 10, priority: 0, priority_id: 1,commitment_hours: 5)
bc6 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 15, priority: 3, priority_id: 4,commitment_hours: 5)
bc7 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 16, priority: 2, priority_id: 3,commitment_hours: 3)
bc8 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 17, priority: 1, priority_id: 2,commitment_hours: 2)
bc9 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 30, priority: 0, priority_id: 1,commitment_hours: 5)
bc10 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 31, priority: 0, priority_id: 1,commitment_hours: 3)
bc11 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 41, priority: 3, priority_id: 4,commitment_hours: 10)
bc12 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 42, priority: 3, priority_id: 4,commitment_hours: 5)
bc14 = Budget.find_or_create_by(budget_name: "Heavy Work Week", user_id: 1, commitment_id: 48, priority: 1, priority_id: 2,commitment_hours: 20)

puts "✅ Done seeding budgets!"


puts "🌱 Planting User seeds..."

WeeklyInitiative.create(user_id: 1, week_id: 1, initiative_name: "Weekly Yoga", initiative_type: 2, initiative_target: 3, open: true)
WeeklyInitiative.create(user_id: 1, week_id: 1, initiative_name: "Daily Meditation", initiative_type: 2, initiative_target: 5, open: true)
WeeklyInitiative.create(user_id: 1, week_id: 1, initiative_name: "Reading Goal", initiative_type: 1, initiative_target: 5, open: true)

puts "✅ Done seeding weekly initiative seeds..."

puts "🌱 Planting progress log seeds..."

ProgressLog.create(weekly_initiative_id: 1, log_date: Date.new(2023, 3, 28), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 1, log_date: Date.new(2023, 3, 30), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 1, log_date: Date.new(2023, 4, 1), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 2, log_date: Date.new(2023, 3, 27), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 2, log_date: Date.new(2023, 3, 28), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 2, log_date: Date.new(2023, 3, 29), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 3, log_date: Date.new(2023, 3, 27), log_amount: 1)
ProgressLog.create(weekly_initiative_id: 3, log_date: Date.new(2023, 3, 29), log_amount: 0.5)
ProgressLog.create(weekly_initiative_id: 3, log_date: Date.new(2023, 3, 30), log_amount: 1.5)

puts "✅ Done progress log seeds..."