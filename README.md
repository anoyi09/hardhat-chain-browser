# hardhat-chain-browser
this is a hardhat localhost network chain browser. It can look the local chain message. Example，Accounts, Blocks,Transactions,contracts,Events,EventLogs

this use vue3.0 ts vite ehters.js 5.7

# prepare
You need start a hardhat local network like this : npx hardhat node
other,in your hardhat powershell You need run: npx hardhat complie, complie your contracts
be careful,if you want look contacts's Events, you should give a name to every contract in hardhat contract like this: string public name = 'your contract name'

# use method

1、In the project root directory have a file named app.config.ts, you should config this file with two keys:
RpcUrl: your hardhat node Rpc address
hardHatProjectPath: your hardhat project absolute path, like this: E:/OpenProjects/hardhatTest/

2、run npm install, use node > 18  best

3、complie your hardhat contracts

4、run project, npm run dev


# Example image
![example image](https://github.com/anoyi09/hardhat-chain-browser/tree/main/public/example.png)
