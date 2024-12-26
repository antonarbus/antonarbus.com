# myvocab.org

## Cloud Run

- create a cloud run container with unauthenticated access + min 0 instances + 'us-central1' region
- give it a name "cloud-run"
- it is possible that on first deployment you have to security --> "Allow unauthenticated invocations"
- go to Manage custom domains --> Add mapping --> Select domain --> generate dns settings --> add it to your hosting

https://console.cloud.google.com/run/detail/us-central1/cloud-run/metrics?inv=1&invt=AblLKg&project=antonarbus

## Artifact Registry

- create repository for docker + 'us-central1' region + with delete artifacts option
- give it a name "artifact-registry"

https://console.cloud.google.com/artifacts/docker/antonarbus/us-central1/artifact-registry?inv=1&invt=AblLNw&project=antonarbus

## IAM-Admin

- go to Service Accounts --> Create Service Account to let github actions upload docker to Artifact Registery
- give it a name "github-actions-sa"
- add roles: 1. "Cloud Run Admin" 2. "Artifact Registry Administrator" 3. "Service Account User"
- go into created account --> keys --> add key --> create new json key
- copy full content of the key (big object) and add into github --> settings --> secretes & variables --> actions --> New repository secrets --> under "GCP_SA_KEY" name

## Github Actions

- Container is automatically deployed with github actions on merge to main branch
- Configuration is kept at /.github/workflows/google-cloudrun-docker.ymal
