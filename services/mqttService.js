const mqtt = require('mqtt');

class MQTTService {
  constructor(host, messageCallbacks) {
    this.mqttClient = null;
    this.host = host || "ws://localhost:9001/mqtt";  // Updated to localhost by default
    this.messageCallbacks = messageCallbacks || {};
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host);

    this.mqttClient.on("error", (err) => {
      console.log("MQTT Error:", err);
      this.mqttClient.end();
      if (this.messageCallbacks.onError) this.messageCallbacks.onError(err);
    });

    this.mqttClient.on("connect", () => {
      console.log("MQTT client connected");
      if (this.messageCallbacks.onConnect) this.messageCallbacks.onConnect("Connected");

      // Subscribe to a topic (example)
      this.subscribe('your/topic'); // Change 'your/topic' to the actual topic you want to subscribe to
    });

    this.mqttClient.on("message", (topic, message) => {
      if (this.messageCallbacks.onMessage) {
        this.messageCallbacks.onMessage(topic, message.toString());
      }
    });

    this.mqttClient.on("close", () => {
      console.log("MQTT client disconnected");
      if (this.messageCallbacks.onClose) this.messageCallbacks.onClose();
    });
  }

  publish(topic, message, options = { qos: 1 }) {
    if (this.mqttClient && this.mqttClient.connected) {
      this.mqttClient.publish(topic, message, options);
    } else {
      console.log("Unable to send message. MQTT client is not connected.");
    }
  }

  subscribe(topic, options = { qos: 1 }) {
    if (this.mqttClient) {
      this.mqttClient.subscribe(topic, options, (err) => {
        if (err) {
          console.log(`Failed to subscribe to topic ${topic}:`, err);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    }
  }

  unsubscribe(topic) {
    if (this.mqttClient) {
      this.mqttClient.unsubscribe(topic);
    }
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  }
}

module.exports = MQTTService;

