// connect to Moralis server

const serverUrl = "https://wc9uugow39y5.usemoralis.com:2053/server";
const appId = "4iwUPAtQrDYzQcSgpsi89hhNjoXfqY78LRCHlHRw";
//Moralis.start({ serverUrl, appId });
Moralis.initialize(appId);
Moralis.serverUrl = serverUrl;

// Connect to Archive, not able to since MikePolygonCoin don't have code ABI
/*const nodeUrl = "https://speedy-nodes-nyc.moralis.io/5cbbc9f78936ea62d01f0887/polygon/mumbai/archive"; // Polygon TestNet Archive node

let web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));
web3.eth.getBlockNumber()
    .then(function(blockNumber) {
        document.getElementById("blockNumber").innerHTML = "Block number: " + blockNumber;
    });

const CONTRACT_ADDRESS = "0x65be5b2f72edad9076d49191099d66c68ca0bb17"; // MPC : MikePolygonCoin SmartContract Address
const CONTRACT_ABI = [{"type": "function", "stateMutability": "view","payable": false, 
    "inputs": [{"type":"address","name":""},{"type":"address","name":""}],
    "constant": [{"type":"address","name":"src","indexed":true},{"type":"address","name":"dst","indexed":true}]
}];
const CONTRACT = new web3.eth.Contract(CONTRACT_ABI,CONTRACT_ADDRESS);*/

init = async () => {
    window.web3 = await Moralis.Web3.enable();
    const user = await Moralis.User.current();
    console.log("logged in user:", user.get("ethAddress"));
    //login();

    // get stats on page load
    //getStats();
}

// add from here down
login = async () => {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({signingMessage:"Vérifier que vous êtes bien le propriétaire de votre wallet"});
    }
    console.log("logged in user:", user.get("ethAddress"));
    //console.log("Polygon Balance:", user.get("polygonAddress"));
    //getStats();
}

signup = async (email, password) => {
    const user = new Moralis.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    try {
    await user.signUp();
        // Hooray! Let them use the app now.
        console.log("logged in user: " + user.get("ethAddress"));
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
}

logOut = async () => await Moralis.User.logOut();

document.getElementById("signup").onclick = () => signup(document.getElementById("email").value, document.getElementById("password").value);
document.getElementById("login").onclick = login;
document.getElementById("logout").onclick = logOut;
document.getElementById("getStats").onclick = getStats;

init();

/*
function getStats() {
    const user = Moralis.User.current();
    if (user) {
        getUserTransactions(user);
    }
    getAverageGasPrices();
}

async function getUserTransactions(user) {
    // create query
    const query = new Moralis.Query("EthTransactions");
    query.equalTo("from_address", user.get("ethAddress"));

    // subscribe to query updates ** add this**
    const subscription = await query.subscribe();
    handleNewTransaction(subscription);

    // run query
    const results = await query.find();
    console.log("user transactions:", results);
}

async function handleNewTransaction(subscription) {
    // log each new transaction
    subscription.on("create", function(data) {
        console.log("new transaction: ", data);
    });
}

async function getAverageGasPrices() {
    const results = await Moralis.Cloud.run("getAvgGas");
    console.log("average user gas prices:", results);

    renderGasStats(results);
}

function renderGasStats(data) {
    const container = document.getElementById("gas-stats");
    container.innerHTML = data
        .map(function (row, rank) {
        return `<li>#${rank + 1}: ${Math.round(row.avgGas)} gwei</li>`;
        })
        .join("");
}
*/
