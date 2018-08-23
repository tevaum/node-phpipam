import stampit from 'stampit';

import Debug from './utils';
import Proxy from './proxy';
import Token from './token';

let IPAM = function (options) {
    if (!options.username)
	throw new Error('Missing options.username');
    if (!options.password)
	throw new Error('Missing options.password');

    let config = Object.assign({}, options);

    config.authorization = 'Basic ' + new Buffer(`${options.username}:${options.password}`).toString('base64');
    config.debug = Debug.proxy;

    delete config.username;
    delete config.password;

    config.token = Token.conf({debug: Debug.token})();

    return Proxy.conf(config);
};

export default IPAM;
