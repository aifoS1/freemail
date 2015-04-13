class Message < ActiveRecord::Base

  belongs_to :sender, class: User
  belongs_to :recipient, class: User

validates :read, :important, inclusion: {
  in: [true, false]
}

 validates :subject, :content, :sender_id, :recipient_id, presence: true

end
