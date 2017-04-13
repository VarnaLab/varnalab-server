
# @varnalab/server

```bash
npm install -g @varnalab/server
varnalab-server --invite /path/to/config.json --port 3000 --env production
```

# Invite - config.json

```json
{
  "production": {
    "varnalab": {
      "provider": "slack",
      "id": "varnalab",
      "name": "VarnaLab",
      "token": "[ACCESS_TOKEN]",
      "invite": [],
      "meta": [],
      "static": {
        "favicon": "/varnalab/images/favicon.ico",
        "logo": "/varnalab/images/logo.png",
        "css": [
          "/varnalab/css/styles.css"
        ],
        "js": [
          "/varnalab/js/logo.js",
          "/varnalab/js/ascii.js",
          "/varnalab/js/matrix.js",
          "/varnalab/js/index.js"
        ]
      },
      "strings": [
        "Присъедини се към чат канала на",
        "в Slack!",
        "потребители са активни в момента от",
        "регистрирани",
        "Вземи своята покана сега!",
        "Поканата се изпраща",
        "Провери пощата си!",
        "или",
        "се логни"
      ]
    },
    "varnalab-github": {
      "provider": "github",
      "id": "varnalab",
      "name": "VarnaLab",
      "token": "[ACCESS_TOKEN]",
      "invite": [],
      "meta": [],
      "static": {
        "favicon": "/varnalab-github/images/favicon.ico",
        "logo": "/varnalab-github/images/logo.png",
        "css": [
          "/varnalab-github/css/styles.css"
        ],
        "js": [
          "/varnalab-github/js/logo.js",
          "/varnalab-github/js/ascii.js",
          "/varnalab-github/js/matrix.js",
          "/varnalab-github/js/index.js"
        ]
      },
      "strings": [
        "Присъедини се към организацията на",
        "в GitHub!",
        "активни",
        "потребители",
        "Вземи своята покана сега!",
        "Поканата се изпраща",
        "Провери пощата си!",
        "или",
        "се логни"
      ]
    },
    "itclubsbg": {
      "provider": "slack",
      "id": "itclubsbg",
      "name": "VarnaLab",
      "token": "[ACCESS_TOKEN]",
      "invite": [],
      "meta": [],
      "static": {
        "favicon": "/itclubsbg/images/favicon.ico",
        "logo": "/itclubsbg/images/logo.png",
        "css": [
          "/itclubsbg/css/styles.css"
        ],
        "js": [
          "/itclubsbg/js/logo.js",
          "/itclubsbg/js/ascii.js",
          "/itclubsbg/js/matrix.js",
          "/itclubsbg/js/index.js"
        ]
      },
      "strings": [
        "Присъедини се към чат канала на",
        "в Slack!",
        "потребители са активни в момента от",
        "регистрирани",
        "Вземи своята покана сега!",
        "Поканата се изпраща",
        "Провери пощата си!",
        "или",
        "се логни"
      ]
    }
  }
}
```

# Invite - Access Tokens

- Slack Scopes: `admin`
- GitHub Scopes: `admin:org`

# Invite - Build Static Files

```bash
npm install -g lure
lure --config /path/to/invite/config.json --build /path/to/serve/location/ --env production
```

# Invite - Copy Matrix Files and Logo

> TODO

# Invite - github.varnalab.org

```nginx
upstream varnalab-github {
  server 127.0.0.1:[PORT];
}

server {
  listen 443 ssl;

  server_name github.varnalab.org;
  root /path/to/serve/location/;

  ################ SSL ################

  ssl_certificate /etc/letsencrypt/live/github.varnalab.org/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/github.varnalab.org/privkey.pem;
  add_header Strict-Transport-Security max-age=15768000;

  ################ Locations ################

  # webroot plugin for letsencrypt
  location ^~ /.well-known {
    allow all;
    alias /path/to/serve/location/.well-known/;
  }

  # index.html
  location / {
    try_files /varnalab-github/index.html =404;
    # invalidate index.html always
    add_header Cache-Control 'no-cache';
  }
  # static
  location /varnalab-github/ {
    try_files $uri $uri;
    # invalidate always
    add_header Cache-Control 'no-cache';
  }

  # node
  location /invite {
    proxy_pass http://varnalab-github/invite/;
    # input
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # output
    proxy_hide_header X-Powered-By;
    # invalidate API requests always
    add_header Cache-Control 'no-cache';
  }
}

# redirect to HTTPS
server {
  listen 80;
  server_name github.varnalab.org;
  return 301 https://$host$request_uri;
}
```

# Invite - slack.varnalab.org

```nginx
upstream varnalab-slack {
  server 127.0.0.1:[PORT];
}

server {
  listen 443 ssl;

  server_name slack.varnalab.org;
  root /path/to/serve/location/;

  ################ SSL ################

  ssl_certificate /etc/letsencrypt/live/slack.varnalab.org/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/slack.varnalab.org/privkey.pem;
  add_header Strict-Transport-Security max-age=15768000;

  ################ Locations ################

  # webroot plugin for letsencrypt
  location ^~ /.well-known {
    allow all;
    alias /path/to/serve/location/.well-known/;
  }

  # index.html
  location / {
    try_files /itclubsbg/index.html =404;
    # invalidate index.html always
    add_header Cache-Control 'no-cache';
  }
  # static
  location /itclubsbg/ {
    try_files $uri $uri;
    # invalidate always
    add_header Cache-Control 'no-cache';
  }

  # node
  location /invite {
    proxy_pass http://varnalab-slack/invite/;
    # input
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # output
    proxy_hide_header X-Powered-By;
    # invalidate API requests always
    add_header Cache-Control 'no-cache';
  }
}

# redirect to HTTPS
server {
  listen 80;
  server_name slack.varnalab.org;
  return 301 https://$host$request_uri;
}
```

# nginx.conf

```nginx
http {
  # ...

  ##
  # SSL Settings - digitalocean
  ##

  # allow only the most secure SSL protocols and ciphers
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  # use the strong Diffie-Hellman group
  # generate with: sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_stapling on;
  ssl_stapling_verify on;

  ##
  # Gzip Settings
  ##

  gzip on;
  gzip_disable "msie6";

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_min_length 256;
  gzip_types text/plain text/css
    application/json application/javascript text/xml application/xml
    application/xml+rss text/javascript
    application/vnd.ms-fontobject application/x-font-ttf
    font/opentype image/svg+xml image/x-icon;

  # ...
}
```
