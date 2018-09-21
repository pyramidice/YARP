'use strict';
/**
 * Loads the core on client-side.
 */

/**
 * @namespace yarp
 */
global.NativeUI = require('./YARP/lib/nativeui.js');
let GMProxy = require('./YARP/classes/GMProxy.js');
global.yarp = new GMProxy('yarp');

yarp.Proxy = GMProxy;
yarp.utils = require('./YARP/modules/utils.js');
yarp.browsers = {};
yarp.cameras = {};
yarp.nui = {};
