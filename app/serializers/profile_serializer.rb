class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :user_name, :password, :email, :first_name, :last_name

end