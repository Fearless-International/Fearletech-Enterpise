/**
 * System lifecycle hooks
 */
interface SystemResult {
  id: number;
  fullName: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  result: SystemResult;
  params: {
    data: any;
  };
}

export default {
  async afterCreate(event: Event) {
    // The main email sending logic is in the controller
    // This hook can be used for additional operations after user creation
    console.log('System user created:', event.result.id);
  },
};