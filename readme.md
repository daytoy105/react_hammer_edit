#  服务器端渲染  
     技术栈： 
            web:    React / react-router /Redux / ImmutableJS / webpack /babel
            server: node / koa1.x    
     完成的功能：
        1 webpack的react 热加载 
        2 antd 的配置及使用
        3 redux / css 的 编写 （形式太多，采取一种自己习惯的）
        4 react-router 可实现按需加载 
        5 服务器端渲染 （ssr ） (node + koa 1.x)

# 问题1 
    报错 ：
    (function (exports, require, module, __filename, __dirname) { import express from 'express';
                                                              ^^^^^^
    SyntaxError: Unexpected token import
    解决方法：
        配置babel
        require('babel-register')({
        presets: ['react', 'es2015', 'stage-2'],
        plugins: ['transform-runtime']
        })

#问题2  css 的问题  
     报错 ：
     main.css: Unexpected token, expected ; (2:10)
          1 | 
        > 2 | body, html{
            |           ^
    解决方法：
        配置babel 的plguins
        [
            'babel-plugin-transform-require-ignore',
            {
                extensions: ['.less', '.css']
            }
        ]
    其它的babel 插件也要 加上

# 问题3 window is no defined
    主要在使用window.localstorage.setItem(key,value) 上的问题， 用 react-cookie 替换存储数据就行
    

# 问题4 Uncaught Error: The root route must render a single element   (路由按需加载需要引入的包)
    解决方法：
        配置babel 的plguins  
             add-module-exports

# 问题5 React 性能优化
    渲染相关：
        提升级项目性能，请使用immutable(props、state、store)
        请pure-render-decorator与immutablejs搭配使用
        请慎用setState，因其容易导致重新渲染
        谨慎将component当作props传入
        请将方法的bind一律置于constructor
        请只传递component需要的props，避免其它props变化导致重新渲染（慎用spread attributes）
        请在你希望发生重新渲染的dom上设置可被react识别的同级唯一key，否则react在某些情况可能不会重新渲染。
        请尽量使用const element
    参考：https://github.com/lcxfs1991/blog/issues/8

#问题   onChange={::this.handleChange}   ？是什么写法   绑定 this
    ES7的一个提案, 函数绑定运算符是并排的两个双冒号（::）
    使用上如果传递参数的写法？   onChange={::this.handleChange(i)} 报错
    解决方法：
        配置babel 的plguins
        [
             'transform-function-bind'
        ]
    ps 
     事件的三种写法
     onChange={::this.handleChange}
     onChange={()=>this.handleChange()}
     onClick={this.handleChange.bind(this,i)}

# 问题   static contextTypes = {router:React.PropTypes.object.isRequired}
    // 这个出BUG 了， 原因在babel 的配置里 需要在plugins 加上 
    解决方法：
        配置babel 的plguins
        [
            "transform-class-properties"
        ]  

 