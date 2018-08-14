import stampit from 'stampit';
import superagent from 'superagent';
import nocache from 'superagent-no-cache';

let Proxy = stampit.init(function({}, {stamp}) {
    const debug = stamp.compose.configuration.debug || console.log;
    const options = stamp.compose.configuration;
    const agent = superagent.agent();
    agent.use(nocache);

    if (!options.uri)
	throw new Error('Missing options.uri');
    if (!options.appname)
	throw new Error('Missing options.appname');
    if (!options.authorization)
	throw new Error('Missing options.authorization');

    this.login = () => {
	let uri = `${options.uri}/${options.appname}/user/`;
	debug('POST:', uri);
	return agent
	    .post(uri)
	    .set('Authorization', options.authorization)
	    .then((res) => {
		debug(res.body);
		return res.body.data;
	    }).catch((err) => {
		if (err.response && err.response.body) {
		    let myerr = Object.assign(new Error(), err.response.body, {name: 'ProxyError'});
		    throw myerr;
		}
	    });
    };

    this.get = async (endpoint) => {
    	let uri = `${options.uri}/${options.appname}/${endpoint}/`;

	if (!options.token)
	    throw new Error('You need to login first');

	if (!options.token.is_valid()) {
	    debug('Renewing token...');
	    let token = await this.login();
	    options.token.update(token);
	    debug('Done!');
	}

    	debug('GET:', uri);

	return agent
	    .get(uri)
	    .set('Token', options.token.value)
	    .then((res) => {
    		if (res.body.code == 200 && res.body.success) {
		    //console.log('[RES]', res.body.success);
    		    return res.body.data;
    		} else {
		    let myerr = Object.assign(new Error(), res.body, {name: 'ProxyError'});
		    throw myerr;
		}
	    }).catch((err) => {
		if (err.name == 'ProxyError') throw err;

		if (err.response && err.response.body) {
		    let myerr = Object.assign(new Error(), err.response.body, {name: 'ProxyError'});
		    throw myerr;
		}
	    });
    };
});

export default Proxy;
