# Storefront

This application is part of [riff](https://projectriff.io)'s shopping demo.
It is a GUI for a fictional e-commerce shop.

## Deployment to K8s

```shell script
docker build -t tanzumkondo/storefront .
docker push tanzumkondo/storefront
```

```shell script
kubectl apply -f ./config/storefront-deployment.yaml
kubectl apply -f ./config/storefront-service.yaml
```

## Run

Start the [inventory API](https://github.com/tanzu-mkondo/inventory-management/) first.

```shell script
$ npm install # if not done before
$ npm start # runs ng serve
```

If every required service is already deployed to Kubernetes, run instead:
```shell script
$ npm run start-with-k8s
```

## Development

### Testing

```shell script
# if not done before
$ npm install

# run `ng test` and watch for changes
$ npm run testwatch

# or run tests and return: `ng test --watch=false`
$ npm test

# e2e test with `ng e2e` - requires inventory management spring-boot backend running in parallel
$ npm run e2e
```


### Debugging tips

For unit tests (with `karma`), changing the browser to `'Chrome'` in `karma.conf.js`
allows anyone to inspect elements and see messages in the console.

For end-to-end tests (with `Protractor`), feel free to switch the settings as instructed
in `protractor.conf.js`. It helps visualize where the end-to-end scenario fails.
