export type ShareCodeDeployPayload = {
  purpose: 'claim_deploy_reward';
  model_id: string;
};

export type ShareCodePredictPayload = {
  purpose: 'predict_reward';
  request_id: string;
};
