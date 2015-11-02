# The gulp plugin for generation nginx configs

------------------------------------

## Installation
### NPM
```sh
npm install gulp-nginxer --save-dev
```

------------------------------------

## Usage
### Json

```json
{
    "server_name": [
        "example.com"
    ],

    "proxys": [{
        "location": "/",
        "backends_name": "backend",
        "backends": [{
            "address":        "127.0.0.1",
            "port":           8080
        }]
    }],

    "globals": {
        "trust_proxy": true
    }
}
```

### Task

~~~js
var gulp = require('gulp');
var nginxer = require('gulp-nginxer');

gulp.task('default', function() {
  return gulp.src('example.json')
             .pipe(nginxer())
             .pipe(gulp.dest('dist'));
});
~~~

### Nginx config

~~~nginx
upstream backend {
    server 127.0.0.1:8080;
}

server {
    listen       80;
    server_name  example.com;

    
    access_log   /tmp/nginx.test.log;
    error_log    /tmp/nginx.test.log;

    #####################################
    # GZIP
    #####################################
    gzip on;
    gzip_vary on;

    gzip_disable "MSIE [4-6]\.";
    gzip_types text/plain 
               text/css 
               application/json 
               application/x-javascript 
               text/xml 
               application/xml 
               application/xml+rss 
               text/javascript 
               application/javascript;
    # gzip_buffers 16 8k;
    # gzip_length 20;
    # gzip_http_version 1.1;
    # gzip_proxied off;
    # gzip_comp_level 1;

    #####################################
    # Locations
    #####################################


    # Proxy
    location / {
        # Headers
        

        # Trust Proxy
        add_header Host $host;
        add_header X-Real-IP $remote_addr;
        add_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # expires 3m;
        proxy_pass http://backend;
    }
}
~~~

------------------------------------

## Build form coffee source
### Build project
The source code in the folder **development**. They should be compiled in the **bin** folder

```sh
# With watching
gulp
```

or

```sh
gulp build
```

### Build gulpfile

```sh
coffee -c gulpfile.coffee
```
