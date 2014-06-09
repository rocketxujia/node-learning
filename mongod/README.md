###install dependencies:
     $ cd . && npm install

###run the app:
     $ DEBUG=my-application ./bin/www


### 程序运行准备前提
1. 安装mongodb

2. 导入db数据：

> mongorestore -h localhost:27017 --db  test --directoryperdb  ./db/test

### 参考文档
1. http://blog.csdn.net/sunchunmei555/article/details/12750301
2. http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
3. mongo数据导入导出： http://www.cnblogs.com/jiangzhichao/archive/2011/08/12/2135899.html

