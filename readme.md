
调试模式启动服务器  
cd dist && pinus start


调试游戏服务器的方法：  
1、安装vscode  
2、在game-server目录启动vscode  
3、按照正常流程启动游戏服  
4、在“调试”界面，选择Attach To Connector或Attach To Master  
5、按F5把调试器挂上去，然后就可以断点调试了。  

### 目录结构
```
.
├── .vscode                   //vscode调试文件
├── app                       //项目开发文件
|   ├── controller            //控制层
|       ├── account           //登陆控制层
|       ├── club              //club控制层
|       ├── clubRoom          //clubRoom控制层
|       ├── user              //user控制层
|       └── room              //野生房间控制层
|           
|   ├── db                    //数据库和redis
|   ├── gameConfig            //游戏固定配置
|   ├── init                  //项目第一次上线时的init
|   ├── interface                     
|   ├── models                // m层             
|   ├── servers               // 核心服务器
|   ├── test                  // 测试模块
|   └── util                  // 工具类
├── config                    // 服务器配置清单
├── dist                      // 生成的文件
├── app.ts                    // 项目入口
├── copy.js                   // 辅助工具
├── preload                   // bluebird
```