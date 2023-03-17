class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :username, :password, :email, :first_name, :last_name

end