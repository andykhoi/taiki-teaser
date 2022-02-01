import { S3 } from '@aws-sdk/client-s3'

import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const REGION = 'us-east-1'       

export const s3Client = new S3({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
    identityPoolId: 'us-east-1:d6b1d73d-cc6e-486d-ab39-709c1f61068d',
  })
});