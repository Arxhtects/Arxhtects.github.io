    import TokenInfo from "./token_info.js"

    const web3 = new Web3(window.ethereum);

    let baselineURI = "https://ipfs.io/ipfs/bafybeibcfgitbgkmyxmmanvbcfn5tgn4nn2j7ouhhzvc6cib7vsp6tnaci/"
    const contract = new web3.eth.Contract(TokenInfo, "0x34Bc797F40Df0445c8429d485232874B15561728");
    let req = new XMLHttpRequest();

    async function getDetails(items, address) {
        const walletAddress = address; //TODO Connect and get (ReadONLY)
        contract.defaultAccounts = walletAddress;
        const lucidBalance = await contract.methods.balanceOf(walletAddress).call();

        for(let i = 0; i <= lucidBalance; i++) {
            let tokenUri = baselineURI + items[i].token_id;
            const tokenMeta = await fetch(tokenUri).then((response) => response.json());
            const tokenImage = tokenMeta.image;
            if(tokenImage.startsWith("ipfs://")) {
                tokenImage = "https://ipfs.io/ipfs/${tokenImage.split('ipfs://')[1]}";
            }
            $("#nftwrap").append('<div class="json"><img src="' + tokenImage + '">' + JSON.stringify(tokenMeta) + '</div>');
        }
    }

    async function getList(address) {
        const walletAddress = address; //TODO Connect and get (ReadONLY)

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                const jsonList = JSON.parse(req.responseText);
                const recordsList = jsonList['record'];
                const filterdList = recordsList.filter(element => element.address == walletAddress);
                //console.log(filterdList);
                getDetails(filterdList, address)
            }
        };
          
        req.open("GET", "https://api.jsonbin.io/v3/b/6349682b0e6a79321e285678/latest", true);
        req.setRequestHeader("X-Master-Key", "$2b$10$M4HutcgG6nfvlpHWX6xEAuxZudTwmi3Di2FY69t6Xk6gwt0aEZy9O");
        req.send();

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
        var searchAddress = $("#address").val();
        if(searchAddress == null || searchAddress == "") {
            //do errors and stuff
        } else {
            getList(searchAddress);
        }
    });

    $("#getAddressList").on("click", function() {
        refreshData();
    });
