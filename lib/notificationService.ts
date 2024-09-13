import * as signalR from "@microsoft/signalr";

export class NotificationService {
    private connection: signalR.HubConnection | null = null;

    public startConnection = async (hubUrl: string, token: string = '') => {
        try {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(hubUrl, {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

            await this.connection.start();
            console.log("Notification service Connected.");
        } catch (err) {
            console.error("Error while starting Notification connection: ", err);
        }
    };

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
            this.connection.on(method, callback);
        }
    };

    // Stop the connection
    public stopConnection = async () => {
        if (this.connection) {
            await this.connection.stop();
            console.log("Notification Connection stopped.");
        }
    };
}
