class Trip < ActiveRecord::Base
  has_many :errands
  validates :start_point_address, :end_point_address, presence: true
  validates :start_point_latitude, :start_point_longitude, :end_point_latitude, :end_point_longitude, presence: {message: "Please enter valid start-point and end-point."}

  def set_coordinates(start_coords, end_coords)
    self.start_point_latitude = start_coords.first
    self.start_point_longitude = start_coords.last
    self.end_point_latitude = end_coords.first
    self.end_point_longitude = end_coords.last
  end

  def format_ending_duration
    "#{(self.ending_duration / 60)} minutes"
  end

  def format_original_duration
    "#{(self.original_duration / 60)} minutes"
  end

end
