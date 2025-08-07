export default {
  routes: [
    {
      method: 'GET',
      path: '/bookings/user-stats',
      handler: 'booking.getUserStats',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};