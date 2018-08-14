import stampit from 'stampit';
import Token from './token';
import Proxy from './proxy';

import Debug from './utils';

let config = null;

let phpIPAM = function (options) {
    let config = Object.assign({}, options);

    if (!options.username)
	throw new Error('Missing options.username');
    if (!options.password)
	throw new Error('Missing options.password');

    config.authorization = 'Basic ' + new Buffer(`${options.username}:${options.password}`).toString('base64');
    config.debug = Debug.proxy;

    delete config.username;
    delete config.password;

    config.token = Token.conf({debug: Debug.token})();
    
    return Proxy.conf(config)();
};

export default phpIPAM;
