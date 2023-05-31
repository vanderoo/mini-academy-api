'use strict'


const axios = require("axios");

class ApiRequestor {
    static post(url, server_key, payloads) {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
                "Basic " + Buffer.from(server_key + ":").toString("base64"),
        }

        let body = JSON.stringify(payloads);

        let result = axios.post(url, body, {
            headers: headers
        }).then((res) => {
            return res.data;
        }).catch(e => console.log(e));

        return result;

    }
}

module.exports = ApiRequestor
