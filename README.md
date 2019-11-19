# anydoor
Tiny static resource server by node.

---
 
 ## 安装
```
npm g -i anydoor
```

## 启动
```
bin/anydoor -p XXXX
```
 
## 使用方法
```
anydoor # 当前文件夹作为文件资源根目录

anydoor -p 8080 # 设置端口号为 9527

anydoor -h localhost # 设置 host 为 localhost

anydoor -d /user # 设置根目录为 /user

```


### 现无法解决的问题:
> 1、 createReadStream -> pipe 返回数据中文乱码


