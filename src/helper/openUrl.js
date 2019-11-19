const {exec} = require('child_process'); // exec 可以执行系统命令

module.exports = url => {
    switch (process.platform) {
        case 'darwin': // macOS 支持
            exec(`open ${url}`);
            break;
        case 'win32': // windows 支持
            exec(`start ${url}`);
            break;
    }
};