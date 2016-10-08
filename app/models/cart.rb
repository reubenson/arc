class Cart < ActiveRecord::Base
  belongs_to :user
  has_many :lineitems
  # has_many :items, through: :lineitems # doesn't work!?!?
    # http://www.informit.com/articles/article.aspx?p=2220311&seqNum=6

  def items
    lineitems.each_with_object([]) {|lineitem,arr| arr << lineitem.item}
  end

  def total
    items.inject(0.0){|sum,item| sum + item.price}
  end

  def clear_items
    lineitems.each{|item| item.destroy}
  end

end
