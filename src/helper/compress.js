// 导入： 模块
const {createGzip, createDeflate} = require('zlib'); // 压缩算法模块

module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip()) // 把流文件传入createGzip() 返回一压缩好的文件
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setEncoding('Content-Encoding','deflate');
        return rs.pipe(createDeflate())
    }
};