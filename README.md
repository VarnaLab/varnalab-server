
# varnalab-server

```bash
node bin/ \
  --varnalab test/config/varnalab.json \
  --invite test/config/invite.json \
  --grant test/config/grant.json \
  --port 3000 \
  --env test
```

# Config

## --varnalab [config.json]()

## --invite [config.json]()

> `http://localhost:3000/grant/connect/github/invite`

> `http://localhost:3000/grant/connect/slack/invite`

## --grant [config.json]()


# NginX

## [slack.varnalab.org.conf]()
## [github.varnalab.org.conf]()
## [services.varnalab.org.conf]()


# SystemD

## [node-varnalab.service]()


  [varnalab-matrix]: https://github.com/VarnaLab/varnalab-matrix
