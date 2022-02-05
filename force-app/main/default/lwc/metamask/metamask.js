import { LightningElement } from 'lwc';

export default class Metamask extends LightningElement {

     loginBtnLabel = 'Login'

     get siteURL() {
          return `${window.location.origin}/apex/MetaMaskLogin`
     }

     // renderedCallback() {
     //      console.log('Metamask connectedCallback')

     //      if (!window?.window?.ethereum) {
     //           console.log('MetaMask is NOT installed!')
     //      } else {
     //           console.log('MetaMask is installed!')
     //      }
     // }

     // login() {
     //      const accounts = window.ethereum.request({ method: 'eth_requestAccounts'})
     //      console.log({ accounts })
     // }
}