import { connect } from "@puzzlehq/sdk-core"
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
