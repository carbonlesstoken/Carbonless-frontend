const usdtLink = '<a href="https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955" rel="noreferrer" target="_blank">USDT</a>';
const busdLink = '<a href="https://bscscan.com/token/0xe9e7cea3dedca5984780bafc599bd69add087d56" rel="noreferrer" target="_blank">BUSD</a>';

export const faqData = [
  {
    title: "Why can’t I see CRL in my wallet?",
    content: `
    <em>First of all you need to add CRL to your wallet.</em>
    
    1. Choose «Import Tokens»
    2. Token contract address:  0x4C1bF55CF4d5b5Ec33f7c0DF7276e96E161D8364
    3. Press «Add custom token»`,
  },
  {
    title: "How to add Binance Smart Chain to my wallet",
    content: `
    <em>1. Go to setting page</em>
    
    <em>2. Add a new network</em>

    <em>3. Fill in the info:</em>

    Name: Binance Smart Chain
    RPC URL:  https://bsc-dataseed.binance.org/
    ChainID: 56 
    Symbol: BNB
    Block Explorer: https://bscscan.com`,
  },
  {
    title: "How do I connect my wallet?",
    content: `
<em>For desktop:</em>
Download and install <a href="https://chrome.google.com/webstore/detail/metamasnkbihfbeogaeaoehlefnkodbefgpgknn" rel="noreferrer" target="_blank">Metamask Extension</a>
Follow the instructions in Metamask to Create or Import an Account.
If you have an extension and wallet, just press “Connect wallet” and choose “Metamask”.
Make sure you choose the BSC network and have enough BNB to pay for gas.
Well done!


<em>For mobile devices:</em>
Option 1:
Download Metamask mobile application for IOS or Android device.
Create or Import Account following the instructions.
Go to build-in Browser and paste <a href="https://carbonlesstoken.net/" rel="noreferrertarget="_blank">https://carbonlesstoken.net/</a> to open Carbonless dapp.
Make sure you choose the BSC network  and have enough BNB to pay for gas.
Well done!

Option 2:
Press “Connect wallet” and choose “Trust Wallet”.
You will see the QR-code. Scan it with a mobile wallet compatible with Wallet Connect.
After that you will be able to use Carbonless dapp in any mobile browser.
Make sure you choose the BSC network  and have enough BNB to pay for gas.
Well done!`,
  },
  {
    title: "What tokens are accepted for buying CRL?",
    content: `You can buy CRL with BNB, ${usdtLink} and ${busdLink}.`,
  },
  {
    title: "What if I don`t have BNB, USDT and BUSD ?",
    content: `You can buy  BNB, ${usdtLink} and ${busdLink} using your credit or debit card on our website. The service is provided by Onramper. We do not have access to your funds as well as we do not take any responsibility for them.`,
  },
  {
    title: "What is Soft Cap?",
    content: `Softcap refers to the minimum defined limit for the collection of funds specified by a project's team for its fund-raising. We have determined 1 billion of sold CRL as the Soft Cap. When you buy CRL, both tokens spent on buying and CRL are locked at the contract.  If the sales finishes and we haven't sold 1 billion CRL, you will be able to refund your BNB, ${usdtLink} and ${busdLink}. Otherwise, if you prefer to get CRL immediately to your wallet you can press the redeem button. After that you won\`t be able to get a refund.`,
  },
];
