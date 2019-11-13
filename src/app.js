// 导入： 模块
const http = require('http');
const chalk = require('chalk');
const path = require('path');

// 导入： 自定义配置 + 封装
const conf = require('./config/defaultConfig'); //自定义配置
const route = require('./helper/route'); //封装函数

const server = http.createServer((req, res) => {// 一层回调
    const filePath = path.join(conf.root, req.url); // 合成本地路径 + 请求路径
    route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`; // 配置API
    console.log(`Server started at ${chalk.blue(addr)}`);
});