import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupConnection } from './connection.ts'
import { GetSelectedAccountResponse, SessionTypes, configureConnection, getWalletConnectModalSignClient } from '@puzzlehq/sdk-core';

configureConnection({
  dAppName: "Test Dapp",
  dAppDescription: "A Dapp for @puzzlehq/sdk-core testing",
  dAppUrl: "http://localhost:5173",
  dAppIconURL: "https://i.kym-cdn.com/entries/icons/facebook/000/019/123/CRTX93SWIAEHlo5.jpg"
});

let address: string;
let session: SessionTypes.Struct;

export const setAddress = (_address: string) => {
  address = _address
}

export const setSession = (_session: SessionTypes.Struct) => {
  session = _session
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="connection" type="button">Connect</button>
    </div>
    <div class="card">
      <p id="address">address: ${address}</p>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupConnection(document.querySelector<HTMLButtonElement>('#connection')!)

getWalletConnectModalSignClient().then(async (client) => {
  client.onSessionEvent((data) => {
    console.log('onSessionEvent', data)
    if (data.params.event.name === 'accountSelected') { 
      const address = data.params.event.data.address;
      setAddress(address ?? '');
      document.querySelector<HTMLButtonElement>('#address')!.innerHTML = `address: ${address}`
    }
  })
  
  client.onSessionDelete((data) => {
    console.log('onSessionDelete', data)
  })

  client.onSessionExpire((data) => {
    console.log('onSessionExpire', data)
  })

  if (session) {
    const response: GetSelectedAccountResponse = await client.request({
      topic: session?.topic,
      chainId: 'aleo:1',
      request: {
        jsonrpc: '2.0',
        method: 'getSelectedAccount',
      },
    });
  
    document.querySelector<HTMLButtonElement>('#address')!.innerHTML = `address: ${response.account?.address}`
  }
})