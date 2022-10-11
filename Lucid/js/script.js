import * as web3 from "https://cdn.skypack.dev/web3@1.8.0";
import * as WalletconnectUtils from "https://cdn.skypack.dev/@walletconnect/utils@1.8.0";

import TokenInfo from "./token_info.js"

const web3 = new Web3(window.ethereum);


    async function getDetails() {
        const contract = new web3.eth.Contract(TokenInfo, "0x34Bc797F40Df0445c8429d485232874B15561728");
        const walletAddress = "archtects.eth";//TODO Connect and get (ReadONLY)
        contract.defaultAccounts = walletAddress;
        const lucidBalance = await contract.methods.balanceOf(walletAddress).call();
        console.log(lucidBalance);
    }

    $("#button").on("click", function() {
        getDetails();
    });