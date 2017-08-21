
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

## --varnalab [config.json][config-varnalab]

## --invite [config.json][config-invite]

> `http://localhost:3000/grant/connect/github/invite`

> `http://localhost:3000/grant/connect/slack/invite`

## --grant [config.json][config-grant]


# NginX

## [nginx.conf][nginx-conf]
## [slack.varnalab.org.conf][nginx-slack]
## [github.varnalab.org.conf][nginx-github]
## [services.varnalab.org.conf][nginx-services]


# SystemD

## [node-varnalab.service][systemd-services]


  [config-varnalab]: https://github.com/simov/varnalab-server/blob/master/test/config/varnalab.json
  [config-invite]: https://github.com/simov/varnalab-server/blob/master/test/config/invite.json
  [config-grant]: https://github.com/simov/varnalab-server/blob/master/test/config/grant.json

  [nginx-conf]: https://github.com/simov/varnalab-server/blob/master/test/nginx/nginx.conf
  [nginx-slack]: https://github.com/simov/varnalab-server/blob/master/test/nginx/slack.varnalab.org.conf
  [nginx-github]: https://github.com/simov/varnalab-server/blob/master/test/nginx/github.varnalab.org.conf
  [nginx-services]: https://github.com/simov/varnalab-server/blob/master/test/nginx/services.varnalab.org.conf

  [systemd-services]: https://github.com/simov/varnalab-server/blob/master/test/systemd/node-varnalab.service

  [varnalab-matrix]: https://github.com/VarnaLab/varnalab-matrix
