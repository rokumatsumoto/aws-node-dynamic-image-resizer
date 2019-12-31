<!-- Features -->
<!-- Fixes -->
<!-- Chore & Maintenance -->
<!-- Performance -->

# CHANGELOG

## 2.1.0

### Features

- Add `resize_avatar` function to serverless

### Fixes

- Add uppercase versions of `.png`, `.jpg`, `.jpeg`, `.gif` suffixes to serverless s3 events

### Chore & Maintenance

- Update serverless s3 event prefix of `resize_default` function


## 2.0.1

### Chore & Maintenance

- Move `serverless-offline` from `dependencies` to `devDependencies`
- Remove debug config related `resize` function `HTTP` event
- Refactor JS structure
- Rename `resize` function name to `resize_default` in `serverless.yml`
- Add `LICENSE` file
- Add `CHANGELOG.md` file

### Performance

- Improve `resize` function performance

## 2.0.0

### Features

- The `resize` function is called whenever an image with `.png`, `.jpg`, `.jpeg` or `gif` extension is uploaded to folder `uploaders/` in the `source_bucket`
- The `resize` function runs image resizing process `asynchronously` for the `thumb`, `medium` and `large` sizes
- Save processed objects into `destination_bucket`
- Use `serverless-dotenv-plugin` to reference `environment variables` as `${env:VAR_NAME}` inside `serverless.yml` and load them into `lambda` functions
- Add `s3:PutObjectAcl` permission for specifying `ACL` to the processed objects
- Add `env.js` file for accessing `environment variables`

### Fixes

- `iamRoleStatements` must be placed under `provider` property in `serverless.yml`. See if you need [serverless iam roles per function](https://github.com/functionalone/serverless-iam-roles-per-function)
- `Environment variables` placed under `provider` property in `serverless.yml`

### Chore & Maintenance

- Remove `boyutluseyler-staging` bucket from `resize` function
- Remove `usagePlan` entry from `serverless.yml` file
- Remove `API Gateway` event from `resize` function

## 1.0.1

### Fixes

- `[serverless]` Fix machine-in-the-middle vulnerability in dependency
- `[serverless-offline]` Fix denial of service vulnerability in dependency
- `[webpack]` Fix cross-site scripting vulnerability in dependency

### Chore & Maintenance

- `[lodash]` Remove from dependencies
- `[lodash]` Remove from resolutions
- `[set-value]` Remove from resolutions
