import * as signalR from '@microsoft/signalr'
import { getToken } from '@/lib/cookies'

export class NotificationService {
  private connection: signalR.HubConnection | null = null
  private token = getToken() as string
  private hubUrl = `https://apiovation.com/notification`

  public startConnection = async () => {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => {
            return this.token
          },
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build()

      await this.connection.start()
    } catch (err) {

    }
  }

  // Send a message to the server
  // public sendMessage = async (method: string, ...args: any[]) => {
  //     if (this.connection) {
  //         try {
  //             await this.connection.invoke(method, ...args);
  //         } catch (err) {
  //             console.error("Error sending message: ", err);
  //         }
  //     }
  // };

  // Listen for messages from the server
  public onMessage = (method: string, callback: (...args: any[]) => void) => {
    if (this.connection) {
      this.connection.on(method, callback)
    }
  }

  // Stop the connection
  public stopConnection = async () => {
    if (this.connection) {
      await this.connection.stop()
    }
  }
}
