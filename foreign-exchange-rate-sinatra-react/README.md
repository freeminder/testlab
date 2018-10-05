# Foreign Exchange Rate demo

## System dependencies

- Bundler
- Yarn
- Foreman

## Run instructions

    bundle install
    yarn install
    foreman start

# API endpoint documentation

## JSON keys in API request

- _base_currency_ - base currency; should be a string type; required
- _foreign_currency_ - specified currency; should be a string type; required
- _amount_ - amount to be converted; can be a number in string, integer or float type; required

## JSON keys in API response

- _status_ - status of response
- _total_ - total amount of converted units

## Example requests

Request method: **POST**

Parameters hash:

    "base_currency"=>"USD", "foreign_currency"=>"EUR", "amount"=>"22"

Also can be tested with curl:

    curl -d "base_currency=USD&foreign_currency=EUR&amount=22" -X POST http://localhost:5100/api

## Example responses

    {"status":"success","total":18.9101}
    {"status":"something went wrong","total":null}

## License

Please refer to [LICENSE](LICENSE).
