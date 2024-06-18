


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

//Connect wallet

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

//Get candidates

    const getCandidates = async (candidateId) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const connection = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const candidatesCount = Number(await connection.candidataCount());
      console.log(candidatesCount);

      for (var i = 1; i <= candidatesCount; i++) {

        const candidate = await connection.candidates(i);

        const id = candidate[0];
        const name = candidate[1];
        const voteCount = candidate[2];

        const item = {
          id: Number(id),
          name: name.toString(),
          voteCount: voteCount.toNumber(),
        };

        setCandidatesUseState((prev) => [...prev, item]);
      }

      //Check voting status

      const checkVotingStatus = async (voter) => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
    
          const connection = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
          );
          
          const hasVoted = await connection.voters(voter);
          console.log(voter, "hasVoted: ", hasVoted);
          setVotedOrNot(hasVoted);
        } catch (error) {
          console.error(error);
        }
      }

      const changeHandler = (e) => {
        setWalletAddress(e.target.value);
      };
    
      const handleButtonClick = async () => {
        await checkVotingStatus(walletAddress);
      };

      //Voting

      const vote = async (candidateId) => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = await provider.getSigner();

          const connection = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          const vote = await connection.vote(candidateId);
          } catch (error) {
           console.error(error);
          }
        };

        const handleChange2 = (e) => {
          setCandidateId(e.target.value);
        };

        const buttonClick2 = () => {
          vote(candidateId);
        };

        useEffect(() => {
          checkIfWalletIsConnected();
          connectWallet();
          getCandidates();
        }, []);

        
      }
    };
