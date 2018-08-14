node-phpipam
============

A simple library to aceess [phpIPAM](https://phpipam.net) API.

To use this library you will need:

* A running phpIPAM (duhh)
* An App ID (that you can create under the *Administration* : *API* menu)
* A valid username and password to retrieve and renew the token

For API details, take a look at the official [API documentation](https://phpipam.net/api/api_documentation/).

It currently implements login, token renewal and GET requests. Bug reports, feature and pull requests are welcome!

Tests are not implemented yet :P

Usage
-----

```javascript
var IPAM = require('node-phpipam');

let proxy = IPAM({
    uri: 'https://your_phpipam_site/api',
    appname: 'appname',
    username: 'username',
    password: 'password'
});

proxy.get('addresses/search_hostname/core')
    .then((addrs) => {
	    console.log('OK:', addrs);
    })
    .catch((err) => {
	    console.error('Erro:', err);
    });
```

Usage (es6)
-----------

```javascript

import IPAM from 'node-phpipam';

let proxy = IPAM({
    uri: 'https://your_phpipam_site/api',
    appname: 'appname',
    username: 'username',
    password: 'password'
});

proxy.get('addresses/search_hostname/core')
    .then((addrs) => {
	    console.log('OK:', addrs);
    })
    .catch((err) => {
	    console.error('Error:', err);
    });
```

