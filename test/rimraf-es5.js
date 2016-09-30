const path = require('path');
const remove = require('fs-promise').remove;
remove(path.join(__dirname, '../lib-es5/*'));
