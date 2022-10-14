    import TokenInfo from "./token_info.js"

    const web3 = new Web3(window.ethereum);

    let baselineURI = "https://ipfs.io/ipfs/bafybeibcfgitbgkmyxmmanvbcfn5tgn4nn2j7ouhhzvc6cib7vsp6tnaci/"
    const contract = new web3.eth.Contract(TokenInfo, "0x34Bc797F40Df0445c8429d485232874B15561728");
    let req = new XMLHttpRequest();

    async function getDetails() {
        const walletAddress = "0xa3C121b60C4219274EB6a0e2AfA539336ad7E35D"; //TODO Connect and get (ReadONLY)
        contract.defaultAccounts = walletAddress;
        const lucidBalance = await contract.methods.balanceOf(walletAddress).call();


        // for(let index = 0; index < lucidBalance; index++) {
        //     const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, index).call();
            
        //     let tokenUri = await contract.methods.tokenURI(tokenId).call();
        //     if(tokenUri.startsWith("ipfs://")) {
        //         tokenUri = 'https://ipfs.io/ipfs/' + tokenUri.split("ipfs://")[1];
        //     }

        //     const tokenMeta = await fetch(tokenUri).then((response) => response.json);
        //     console.log(tokenMeta);
        // }
    }
    async function refreshData() { 
    const metaDataAddress = [];
        for(let i = 1; i < 10; i++) {
            const matchaddress = await contract.methods.ownerOf(i).call();
            metaDataAddress.push({
                token_id : i,
                address: matchaddress
            });
            // console.log(JSON.stringify(metaDataAddress));
            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    console.log(req.responseText);
                }
            };
            
            req.open("PUT", "https://api.jsonbin.io/v3/b/6349682b0e6a79321e285678", true);
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("X-Master-Key", "$2b$10$M4HutcgG6nfvlpHWX6xEAuxZudTwmi3Di2FY69t6Xk6gwt0aEZy9O");
            req.send(metaDataAddress);
        }
    }
    $("#button").on("click", function() {
        refreshData();
    });
