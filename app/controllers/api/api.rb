module API
  class API < Grape::API
    mount API::V1::Base
  end
end
