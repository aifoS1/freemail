class User < ActiveRecord::Base

  has_secure_password
  #add .password, .passwords, .password_confirmation=
  #validations on .password, and if .password_confirmation is present will require it to match .password
  #Also adds: .authenticate which will check a plain password against the digest

  #.sent_messages looks in Message for all whose :sender_id is my id
  has_many :sent_messages, class_name: Message, foreign_key: :sender_id
  #.received_messages looks in Message for all whose :received_id is my id
  has_many :received_messages, class_name: Message, foreign_key: :recipient_id

  validates :username, :name, presence: true

end
