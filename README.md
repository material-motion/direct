# Direct

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

Direct is a tool that helps motion designers provide clear, precise motion direction for engineers.

As motion design becomes more and more prominent in apps, it’s becoming increasingly important to develop a standard for communicating direction from motion designers. Once an animation is finalized, simply handing off a video file to engineers makes it very difficult for them to recreate. Animations take a lot of engineering time to implement and there are a lot of subtleties that could get lost in translation. As designers, it’s our responsibility to make sure that engineers have everything they need to quickly recreate this motion.

Disclaimer: This is not an officially supported Google product.

## Getting started

1. Install [Google App Engine](https://cloud.google.com/appengine/docs/flexible/python/download)

2. Install [node.js and npm](https://nodejs.org/)

3. Install dependencies

``` shell
npm i
```

4. Populate config files

    Rename `config_sample.yaml` to `config.yaml`

    (this file can be left blank for most users)


    Rename `app/ts/config_sample.ts` to `app/ts/config.ts`

    Fill in values for `window.__directConfig.stagingDomain` and `window.__directConfig.productionDomain` if you intend to use staging and production environments. Otherwise, they can be left as empty strings.


5. Run a local instance
``` shell
npm run start
```

6. View the server at http://localhost:8080/


## Troubleshooting

```
ImportError: cannot import name apiproxy
```

https://stackoverflow.com/questions/69465376/app-engine-python-2-7-importerror-cannot-import-name-apiproxy
