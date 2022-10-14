    import TokenInfo from "./token_info.js"

    const web3 = new Web3(window.ethereum);

    let baselineURI = "https://ipfs.io/ipfs/bafybeibcfgitbgkmyxmmanvbcfn5tgn4nn2j7ouhhzvc6cib7vsp6tnaci/"
    const contract = new web3.eth.Contract(TokenInfo, "0x34Bc797F40Df0445c8429d485232874B15561728");
    let req = new XMLHttpRequest();

    async function getDetails() {


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

    async function getList() {
        
        const walletAddress = "0x9935a4D7603D26694fcE0E0D9b2fd7d343B56032"; //TODO Connect and get (ReadONLY)
        contract.defaultAccounts = walletAddress;
        const lucidBalance = await contract.methods.balanceOf(walletAddress).call();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const jsonList = JSON.parse(req.responseText);
                console.log(jsonList['record']);
            }
        };
          
        req.open("GET", "https://api.jsonbin.io/v3/b/6349682b0e6a79321e285678/latest", true);
        req.setRequestHeader("X-Master-Key", "$2b$10$M4HutcgG6nfvlpHWX6xEAuxZudTwmi3Di2FY69t6Xk6gwt0aEZy9O");
        req.send();

        for(let index = 0; index < lucidBalance; index++) {

        }
    }    

    async function refreshData() { 
    const metaDataAddress = [];
        for(let i = 1; i <= 5555; i++) {
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
            req.send(JSON.stringify(metaDataAddress));
        }
    }

    $("#getNFTsFromAddress").on("click", function() {
        getList();
    });

    $("#getAddressList").on("click", function() {
        refreshData();
    });
