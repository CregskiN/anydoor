/*
*  说明：
*  code = 200 -> 请求首部range字段值 没有或不合法
*  code = 206 -> 正常返回range 范围 start end
* */

module.exports = (totalSize, req, res) => {
    const range = req.headers['range'];
    // 1、 判断：请求http报文首部 是否有range的字段
    if (!range) {
        return {code: 200};
    }

    // 2、 解析，提取字段值
    const sizes = range.match(/bytes=(\d*)-(\d*)/);
    const end = sizes[2] || totalSize - 1;
    const start = sizes[1] || totalSize - end;

    // 3、判断：解析提取后的range字段值是否合法
    if (start > end || start < 0 || end > totalSize) {
        return {code: 200};
    }

    // 4、 设置并返回：应答http报文首部
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length', end - start);
    return {
        code: 206, // 206-返回部分内容
        start: parseInt(start),
        end: parseInt(end)
    }

};