const path = require('path');
const remove = require('fs-extra').remove;
remove(path.join(__dirname, '../lib-es5/*'));
