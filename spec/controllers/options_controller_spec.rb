require 'spec_helper'

describe OptionsController do
  describe '#index' do
    let(:new_trip){FactoryGirl.create(:valid_trip)}
    before(:each) do
      VCR.use_cassette('options_controller_spec') do
        request.session[:trip_id] = new_trip.id
        get :index, :search => "Tacos"
      end
    end

    it 'assigns a search term based on params' do
      expect(assigns(:search_term)).to eq('Tacos')
    end

    it 'assigns @businesses to four businesses' do
      expect(assigns(:businesses).length).to eq 4
    end

  end
end

