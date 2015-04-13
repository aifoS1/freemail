class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :sender, null: false
      t.references :recipient, null: false

      t.string :subject, null: false
      t.text :content, null: false

      t.boolean :read, default: false
      t.boolean :important, default: false

      t.timestamps null: false
    end
    add_index :messages, :sender_id
    add_index :messages, :recipient_id
  end
end
