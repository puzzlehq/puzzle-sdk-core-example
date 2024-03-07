import { connect, getAccount, getEvents, getRecords } from "@puzzlehq/sdk-core"
import { setAddress, setSession } from "./main";

export function setupConnection(element: HTMLButtonElement) {
  element.addEventListener('click', async () => {
    connect().then((response) => {
      if (response) {
        setSession(response)
        const address = response?.namespaces['aleo']['accounts'][0].split(':')[2];
        setAddress(address);
        document.querySelector<HTMLButtonElement>('#address')!.innerHTML = `address: ${address}`
      }
    })
  })
}

export function postConnectionClick(element: HTMLButtonElement) {
  element.addEventListener('click', async () => {
    getAccount().then((res) => {
      console.log('account', res);
    });

    getRecords({}).then((res) => {
      console.log('records', res);
    });

    getEvents({}).then((res) => {
      console.log('events', res);
    });

    console.log('post_connection done clicked');
  })
}
