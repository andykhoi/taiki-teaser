import { S3 } from '@aws-sdk/client-s3'

import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const REGION = 'us-west-2'       

export const s3Client = new S3({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
    identityPoolId: 'us-west-2:fdfaf1f3-8afb-4d77-9ebe-f2ece123b1af',
  })
});