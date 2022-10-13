import TokenInfo from "./token_info.js"

const web3 = new Web3(window.ethereum);


    async function getDetails() {
        const contract = new web3.eth.Contract(TokenInfo, "0x34Bc797F40Df0445c8429d485232874B15561728");
        const walletAddress = "0xa3C121b60C4219274EB6a0e2AfA539336ad7E35D"; //TODO Connect and get (ReadONLY)
        contract.defaultAccounts = walletAddress;
        const lucidBalance = await contract.methods.balanceOf(walletAddress).call();
        // console.log(lucidBalance);
        for(let index = 0; index < lucidBalance; index++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, index);
            
            let tokenUri = await contract.methods.tokenURI(tokenId).call();
            if(tokenUri.startsWith("ipfs://")) {
                tokenUri = 'https://ipfs.io/ipfs/' + tokenUri.split("ipfs://")[1];
            }

            const tokenMeta = await fetch(tokenUri).then((response) => response.json);
            console.log(tokenMeta);
        }
    }

    $("#button").on("click", function() {
        getDetails();
    });