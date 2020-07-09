# Environment Variables/Secrets

| Variable name                | Variable value                      |
| ---------------------------- | ----------------------------------- |
| SOURCE_BUCKET                | your-source-bucket-name             |
| DESTINATION_BUCKET           | your-target-bucket-name             |
| REGION                       | eu-central-1                        |
| DESTINATION_BUCKET_ACL       | public-read                         |
|                              |                                     |
| RESIZE_DEFAULT_BUCKET_PREFIX | "uploads/design/illustration-file/" |
| RESIZE_AVATAR_BUCKET_PREFIX  | "uploads/user/avatar-file/"         |

| Secret name | Secret value                         |
| ----------- | ------------------------------------ |
|             |                                      |
| SLS_KEY     | XXXXXXXXXXXXXXX                      |
| SLS_SECRET  | XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX |
| PROFILE     | default                              |
| STAGE       | dev                                  |
| REGION      | eu-central-1                         |

See [this](https://www.serverless.com/plugins/serverless-dotenv-plugin) for usage.
