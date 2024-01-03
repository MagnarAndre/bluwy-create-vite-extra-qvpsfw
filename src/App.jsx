import Vue from 'vue';
import App from './App.vue';
import Web3 from 'web3';

Vue.config.productionTip = false;

// Check if Web3 has been injected by the browser (Mist/MetaMask)
window.addEventListener('load', async () => {
  if (window.ethereum) {
    // Use MetaMask's provider
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      new Vue({
        render: (h) => h(App),
      }).$mount('#app');
    } catch (error) {
      console.error('User denied account access...');
    }
  } else if (window.web3) {
    // Legacy dapp browsers...
    window.web3 = new Web3(window.web3.currentProvider);
    // Acccounts always exposed
    new Vue({
      render: (h) => h(App),
    }).$mount('#app');
  } else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    );
  }
});
