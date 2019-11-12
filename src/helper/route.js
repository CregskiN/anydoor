// 导入： 模块
const fs = require('fs');
const promisify = require('util').promisify;
const Handlebars = require('handlebars');
const path = require('path');

// 导入： 自定义配置
const config = require('../config/defaultConfig');
const mime = require('./mime');

// 配置promise
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// 配置文件路径
const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath, 'utf-8'); //同步读模板文件,读取的是 buffer ,转为 utf-8,因为读buffer更快
const template = Handlebars.compile(source.toString()); //.html模板
const compress = require('./compress'); // 导入压缩处理


module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {//当访问路径指向文件
            const contentType = mime(filePath); //拼接Content-Type
            res.statusCode = 200;
            res.setHeader('Content-Type', `${contentType}`);
            let rs = fs.createReadStream(filePath, {encoding: 'utf-8'}); // 创建读取流
            if (filePath.match(config.compress)) { // 检索请求url中是否有指定拓展名
                rs = compress(rs, req, res); // 有，执行压缩
            }
            rs.pipe(res);

        } else if (stats.isDirectory()) { //当访问路径指向文件夹 //返回目录即可
            const files = await readdir(filePath); // 需要await修饰，不然返回的是promise对象
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath); // 返回相对config.root，filePath的地址
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files: files.map((item,index) => {
                    return {
                        file: item,
                        icon: mime(item)
                    }
                })
            };
            res.end(template(data)); // 传回的文件夹列表是数组，.join(',') 用逗号隔开
        }

    } catch (error) {
        res.statusCode = 404;
        res.setHeader('Context-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file\n ${error}`);
    }
};