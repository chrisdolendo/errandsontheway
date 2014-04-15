require 'spec_helper'
describe CoordinatesRetriever do
  describe "get_coordinates" do
    let(:fell){FactoryGirl.create(:fell)}

    it "does not call create_location when it finds a location in db" do
      expect(CoordinatesRetriever).to_not receive(:create_location)
      CoordinatesRetriever.get_coordinates(fell.address)
    end
    it "does call create_location when it doesn't find a location in db" do
      expect(CoordinatesRetriever).to receive(:create_location)
      CoordinatesRetriever.get_coordinates("633 Folsom Street, San Francisco, CA")
    end
  end

  describe "create_location" do
    it "creates a location" do
      Geocoder.stub(:coordinates).and_return([0,0])
      expect{
        CoordinatesRetriever.get_coordinates("633 Folsom Street, San Francisco, CA")
        }.to change{Location.count}.by(1)
    end
  end


end