[toc]

# git与github

[Git教程廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)
[Git教程张果](https://www.cnblogs.com/best/p/7474442.html)

- git：版本控制工具
	- 老项目技术古老设计陈旧，开发新版本后测试完毕上线挂了咋办？
	- 回滚老版本，新版本解决BUG之后重新上线
- github：网站，远程代码管理仓库，贵圈基友交流、学习平台

## 集中式VS分布式

- 集中式缺点：
	- 必须联网，处理速度慢
	- 都使用一个中央处理器，可能会造成数据丢失
- 分布式：
	- 不用联网就能进行版本控制，速度快


## 初始化版本控制状态

- 在需要控制的文件目录下，鼠标右键 单击 Git bash here
- git init：创建.git文件
- git status：查看git状态
- history：查看输入命令历史
- git --version：查看git版本
- pwd：查看当前目录路径
- git rm 文件名：删除版本库的文件(删除之后需重新提交)
- git rm -r --cached .：清除缓存

> 版本控制都是基于.git这个隐藏文件的，如果把他删除就不能进行版本控制了

- 工作区放到暂存区：
	- git add 文件名，(按Tab键补全文件名)（指定一个文件）
	- git add .：目录下所有文件都放到暂存区
- ls：查看目录下所有文件
- ll：查看目录下文件信息
- 上下键切换刚才输入的命令

- 设置作者信息：
	- 设置用户名：git config --global user.name "your name"(英文名，想好，与github一致)
	- 设置邮箱：git config --global user.email "your email"(能收到邮件)

- 暂存区到版本区
	- git commit -m "备注"：可备注版本号
- 工作区-版本区（已经被管理过的文件可用）：
	- git commit -a -m "注释"
	- 注：上面这命令需要已经提交过一次，才可以使用

- 查看版本：
	- git log ：只能查看当前版本之前的版本
	- git reflog ：查看所有历史版本（版本操作的多使用此命令）
- 查看每个区域的不同点(内容更改处)：
	- 工作区与暂存区：git diff
	- 工作区与版本区：git diff master
	- 暂存区与版本区：git diff --cached

- 版本回退：
	- git reset --hard  HEAD^ 回滚上一版本
	- git reset --hard  HEAD^^ 回滚上第二版本
	- git reset --hard  HEAD~n 回滚上第n个版本
	- git reset --hard 版本ID 回滚到对应ID的版本
	- git reset HEAD 文件名 把暂存区的修改撤回到工作区
	- git checked -- 文件名：把工作区的修改撤回至上一次暂存

### 过滤指定文件

- 创建一个.gitignore文件
	- touch .gitignore：创建文件
- 配置过滤项：网上查
- 如果配置不起作用，可以清除缓存再配置

## github

代码托管平台之一，其他有码云、coding...

### 上传到github项目
- 方法一
1. 绑定密钥
		1. ssh-keygen -t rsa -C "邮箱名"，然后无脑回车
		2. (/c/Users/Administrator/.ssh/id_rsa)，VScode中打开，复制内容至ssh中
2. 创建项目
		1. 
3. 确定版本库是最新的（没有东西可以提交）
4. 查看远程仓库：
	1. git remove -v (使用git  init的时候是查不出来的)
5. 添加远程仓库：
	1. git remove add origin(仓库名) url(项目链接)
6. git pull origin(仓库名) master(分支名) (保证能成功上传，进行远程与本地合并)
7. git push origin(仓库名) master(分支名) 上传(第一次会输入用户名密码)

- 方法二：
1. 远程仓库创建项目
2. git clone 项目地址
3. git add .
4. git commit -m ""
5. git push origin master

#### 远程仓库

- 下载远程仓库所有变动：git fetch [remote]
- 

## node

npm 跟着node一起安装的模块

npm 目前世界上最大的资源管理平台，其中有很多开源项目

Yran 世界上最快的资源管理平台
	npm install yarn -gzs

创建项目：npm init -y
	会生成一个package.json文件，文件内存放项目依赖
- 下载方法：
npm insall 资源名
		-g 全局安装
		-s 项目依赖
下载之后会自动生成node_modules的文件夹，文件夹内存放下载的资源