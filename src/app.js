// 导入： 模块
const http = require('http');
const chalk = require('chalk');
const path = require('path');

// 导入： 自定义配置 + 封装
const conf = require('./config/defaultConfig'); //自定义配置
const route = require('./helper/route'); //封装函数
const openUrl = require('./helper/openUrl');

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {// 一层回调
            const filePath = path.join(this.conf.root, req.url); // 合成本地路径 + 请求路径
            route(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`; // 配置API
            console.log(`Server started at ${chalk.blue(addr)}`);
            openUrl(addr);
        });
    }
}

module.exports = Server;


