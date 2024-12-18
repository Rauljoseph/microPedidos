import { Kafka } from 'kafkajs';
import { saveUserToLocalTable } from '../models/tableCache';
import { updateOrderStatus } from '../repositories/sequelizeOrderRepository';

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order-service-group' });

export const consumeUserEvents = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  console.log('Consumidor suscrito al tópico user-events');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const eventKey = message.key?.toString();
      const eventValue = message.value?.toString();

      if (eventKey === 'user.created' && eventValue) {
        const user = JSON.parse(eventValue);
        await saveUserToLocalTable(user); // Guarda en la tabla local
        console.log(`Usuario replicado localmente: ${JSON.stringify(user)}`);
      }
    },
  });
};

export const consumePaymentEvents = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'pedidos-topic', fromBeginning: true });

  console.log('Consumidor suscrito al tópico pedidos-topic');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const eventKey = message.key?.toString();
      const eventValue = message.value?.toString();

      if (eventKey && eventValue) {
        const paymentEvent = JSON.parse(eventValue);

        console.log(`Evento recibido: ${eventKey} -> ${JSON.stringify(paymentEvent)}`);

        if (paymentEvent.estado === 'realizado') {
          await updateOrderStatus(paymentEvent.id_pedido, 'realizado');
        }
      }
    },
  });
};
