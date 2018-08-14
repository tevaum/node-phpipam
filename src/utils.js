import stampit from 'stampit';
import debug from 'debug';

let DebugStamp = stampit.props({
    debug: debug('ipam:debug'),
    proxy: debug('ipam:proxy'),
    token: debug('ipam:token')
});

export default DebugStamp();
