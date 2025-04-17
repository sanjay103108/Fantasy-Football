import SockJS from "sockjs-client";
import Stomp from "stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.subscribers = new Map();
  }

  connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      {},
      this.onConnected.bind(this),
      this.onError.bind(this)
    );
  }

  onConnected() {
    console.log("Connected to WebSocket");
    this.subscribeToLeaderboard();
  }

  onError(error) {
    console.error("WebSocket Error:", error);
  }

  subscribeToLeaderboard() {
    this.stompClient.subscribe("/topic/leaderboard", (message) => {
      const users = JSON.parse(message.body);
      if (this.subscribers.has("leaderboard")) {
        this.subscribers.get("leaderboard")(users);
      }
    });
  }

  subscribe(channel, callback) {
    this.subscribers.set(channel, callback);
  }

  unsubscribe(channel) {
    this.subscribers.delete(channel);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}

export default new WebSocketService();
