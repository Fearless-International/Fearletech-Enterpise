export default {
    routes: [
      {
        method: 'POST',
        path: '/subscribers/unsubscribe',
        handler: 'subscriber.unsubscribe',
        config: {
          auth: false,
        },
      },
    ],
  };