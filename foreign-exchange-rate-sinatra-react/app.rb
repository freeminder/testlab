require 'sinatra'
require 'sinatra/cross_origin'
require 'net/http'
require 'json'

set :public_folder, 'public'

# set :bind, '0.0.0.0'
configure do
  enable :cross_origin
end
before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

# Routes
options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end


# get '/' do
#   haml :readme
# end 
get "/" do
  redirect '/index.html'
end

get "/currencies_list" do
  # Get currencies list
  url = "https://api.exchangeratesapi.io/latest?base=EUR"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  response_obj = JSON.parse(response)
  response_obj["rates"].keys.unshift("EUR").to_json
end

post '/api' do 
  headers 'Access-Control-Allow-Origin' => '*'

  return_message = {}
  # Error handling
  if params.has_key?('base_currency') and params.has_key?('foreign_currency') and params.has_key?('amount')
    # Set currencies
    base_currency = params[:base_currency]
    foreign_currency = params[:foreign_currency]
    amount  = params[:amount].to_f

    # Set API endpoint
    url = "https://api.exchangeratesapi.io/latest?base=#{base_currency}"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    response_obj = JSON.parse(response)

    # Get rate
    rate = response_obj["rates"]["#{foreign_currency}"].to_f

    # Respond with total amount
    return_message[:status]  = 'success'
    return_message[:total]   = rate*amount
  else
    return_message[:status] = 'something went wrong'
    return_message[:total]  = null
  end

  return_message.to_json 
end
