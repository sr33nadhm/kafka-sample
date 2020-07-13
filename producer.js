const kafka = require("kafka-node");

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
  const producer = new Producer(client);
  const kafka_topic = "node_topic";
  let topics = [
    {
      topic: kafka_topic,
      messages: "This message is sent from nodeJS at " + Date(Date.now()),
    },
  ];

  producer.on("ready", async function () {
    let data_transfer = producer.send(topics, (err, data) => {
      if (err) {
        console.log("Producer update failed for " + kafka_topic);
      } else {
        console.log("Producer update success for " + kafka_topic);
      }
    });
  });

  producer.on("error", function (err) {
    console.log("Kafka connection error");
    console.log(err);
    throw err;
  });
} catch (e) {
  console.log(e);
}
