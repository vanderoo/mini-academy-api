'use strict';

const SANDBOX_BASE_URL = "https://api.sandbox.midtrans.com/v2";
const PRODUCTION_BASE_URL = "https://api.midtrans.com/v2";

class ConfigController {
    static serverKey = 'server key';
    static isProduction = false;
    static is3ds = false;
    static isSanitized = false;

    static getBaseUrl(){
        return ConfigController.isProduction ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL;
    }
    
}

module.exports = ConfigController
