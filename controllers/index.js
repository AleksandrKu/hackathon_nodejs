'use strict';
const { userinfo } = require('./userinfo');
const { userinfoadd } = require('./userinfoadd');
const { userinfoaddaddress } = require('./userinfoadd');
const { userinfoget } = require('./userinfoget');
module.exports.userinfo = userinfo;
module.exports.userinfoadd = userinfoadd;
module.exports.userinfoaddaddress = userinfoaddaddress;
module.exports.userinfoget = userinfoget;