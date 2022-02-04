import { LightningElement } from 'lwc';
import getCrypto from '@salesforce/apex/CryptoHelper.getCrypto';

export default class Crypto extends LightningElement {

     coins = []

     async connectedCallback() {
          await this.init()

          setInterval(() => {
               this.init()
          }, 13000)
     }

     async init() {
          
          try {
               const result = JSON.parse(await getCrypto())
          
               const data = result?.data
               
               this.coins = data.map(coin => {
                    coin.urlIcon = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`
                    coin.url = formatUrl(coin.name)
                    coin.circulating_supply = (coin.circulating_supply || 0).toLocaleString()
                    coin.max_supply = (coin.max_supply || 0).toLocaleString()
                    coin.styles = {
                         percent_change_24h_style : numberToColor(coin?.quote?.USD?.percent_change_24h) + ' slds-truncate',
                         percent_change_7d_style : numberToColor(coin?.quote?.USD?.percent_change_7d) + ' slds-truncate',
                         percent_change_30d_style : numberToColor(coin?.quote?.USD?.percent_change_30d) + ' slds-truncate',
                         percent_change_90d_style : numberToColor(coin?.quote?.USD?.percent_change_90d) + ' slds-truncate',
                    }
                    return coin
               })
               console.log(this.coins)
          } catch (error) {
               console.error(error)
          }
     }
}

const numberToColor = (num) => {
     num = isNaN(num) ? 0 : Number(num.toFixed(1))
     return num > 0 ? 'positive' 
          : num < 0 ? 'negative' 
          : 'netrual'
}

const formatUrl = (name) => {
     name = name.replaceAll(' ', '-')
     name = name.replaceAll('.', '-')
     return `https://coinmarketcap.com/currencies/${name.toLowerCase()}/`
}