vue2.x + Mock + element-ui + echarts

# vue-mange

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### git的使用
```
git status
git remote add origin git@github.com:zhezhidashi/medical-vue-02-01.git
git remote -v

git add .
git commit -m "版本更新标注"
git push origin master
git status
```

### screen 的使用
```
# 新建 session
screen -S <session名称>

# 列出当前所有的 session
screen -ls

# 回到某个session
screen -r <session名称>

# 离开作业
ctrl + A + D

# 离开当前session
detach -d <session名称>

# 结束当前session
exit
```

### 服务器运行前端
```
npx http-server -p 8082
```

### docker
```
docker build -t frontend -f Dockerfile docker
docker run -d -p 8082:80 frontend
```