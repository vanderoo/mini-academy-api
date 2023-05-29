'use strict'

const ApiRequestor = require("./ApiRequestor");
const Config = require("./ConfigController")

class CoreApi {
    static charge(payloads) {
        let result = ApiRequestor.post(
            Config.getBaseUrl() + "/charge",
            Config.serverKey,
            payloads
        );
        return result;
    }
}

module.exports = CoreApi
