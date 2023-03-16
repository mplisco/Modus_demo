class User < ApplicationRecord

    has_many :budgets
    has_many :commitments, through: :budgets

    validates :username, presence: true, uniqueness: true, length { minimum: 2}
    validates :first_name, presence: true
    validates :last_name, presence: true
    VALID_EMAIL_REGEX= /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i
    validates :email , presence: true, uniqueness:{case_sensetive:false},
    format:{with:VALID_EMAIL_REGEX,multiline:true}
    validates :password, presence: true, length: { in: 6..20 }
end
