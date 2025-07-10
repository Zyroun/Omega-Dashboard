import { logAgentActivity, logError } from '../utils/logger';
import { delay } from '../utils/helpers';

const TrafficAgent = {
  name: 'TrafficAgent',
  description: 'Analyzes store traffic and scales infrastructure or triggers campaigns based on detected spikes.',

  async execute(payload) {
    logAgentActivity('TrafficAgent', 'Execution Started', payload);

    try {
      const { pattern, currentTraffic, averageTraffic } = payload;

      const surgeDetected = currentTraffic > averageTraffic * 1.5;
      const actionTaken = surgeDetected ? 'scale_infrastructure' : 'continue_monitoring';

      if (surgeDetected) {
        await delay(500); // simulate async scaling task
        logAgentActivity('TrafficAgent', 'Traffic Surge Detected - Scaling infrastructure');
      } else {
        logAgentActivity('TrafficAgent', 'Traffic Normal - No action taken');
      }

      return {
        status: 'success',
        surgeDetected,
        actionTaken,
      };
    } catch (err) {
      logError(err, 'TrafficAgent::execute');
      return { status: 'error', message: err.message };
    }
  },
};

export default TrafficAgent;
