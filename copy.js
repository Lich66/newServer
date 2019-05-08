const path = require('path');
const fs = require('fs');
const copydir  = require('copy-dir')
try {
    fs.mkdirSync(path.join(__dirname,'dist','config'))
} catch (error) {
    
}
copydir.sync('./config', './dist/config',{});