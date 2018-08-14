import stampit from 'stampit';

let Token = stampit.init(function({token = 'Invalid', expires = '1970-01-01 00:00:00', thereshold = 3600000}, {stamp}) {
    let debug = console.log;

    if (stamp.compose.configuration && stamp.compose.configuration.debug)
	debug = stamp.compose.configuration.debug;

    if (!token)
	throw new Error('Missing options.token');
    if (!expires)
	throw new Error('Missing options.expires');

    this.value = token;
    this.expires = expires;
    this.thereshold = thereshold;

    this.is_valid = () => {
	let exp = new Date(this.expires);
	let now = new Date();
	let diff = exp - now;

	if (exp - now > 0)
	    debug(`Token will expire in ${parseInt(diff/1000/60)} minutes and should be updated in ${parseInt((diff-thereshold)/1000/60)} minutes`);
	else
	    debug(`Token expired ${parseInt(diff/1000/60*-1)} minutes ago`);
	return exp - now > this.thereshold;
    };

    this.update = ({token, expires}) => {
	this.value = token;
	this.expires = expires;
    };
});

export default Token;
