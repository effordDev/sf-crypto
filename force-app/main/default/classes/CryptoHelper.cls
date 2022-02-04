public with sharing class CryptoHelper {
    
    @AuraEnabled
    public static string getCrypto(){
        String key = [
            SELECT Id, API_Key__c
            FROM CoinMarketCap__mdt
            LIMIT 1
        ].API_Key__c; 

        HttpRequest req = new HttpRequest();
            req.setEndpoint('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest');
            req.setMethod('GET');
            req.setHeader('X-CMC_PRO_API_KEY', key);

        Http http = new Http();

        return Test.isRunningTest() ? '' : new Http().send( req ).getBody();
    }
}