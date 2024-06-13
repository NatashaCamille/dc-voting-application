


export default function Home() {


    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
      
            if (!ethereum) {
              console.log("Please install metamask!!!");
            } else {
              // console.log("We have the ethereum object", ethereum);
            }
      
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
              const account = accounts[0];
              // console.log("Authorized account has found", account);
              setCurrentAccount(account);
              console.log("Connected");
            } else {
              setCurrentAccount("");
              console.log("No authorized account has found!");
            }
          } catch (error) {
            console.error(error);
          }
    };

    const connectWallet = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          alert("Metamask has found!");
          return;
        }
  
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (err) {
        console.error(err.message);
      }
    };
}