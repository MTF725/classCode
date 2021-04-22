import React, {Component} from 'react';
//引入Route, Link,withRouter
import {Route, Link,withRouter} from 'react-router-dom';
import "./Baselayout.css";
import Home from "./Home";
import Eentertainment from "./Entertainment";
import Pe from "./Pe";
import Hot from "./Hot";
import Military from "./Military";

class Baselayout extends Component {
    constructor(props) {
        super(props);
        this.toHome=this.toHome.bind(this)//改变this指向
        this.state={
            id:111,
            name:"张三",
            obj1:{name:"李四",age:25,sex:"男"}
        }
    }
    toHome(){
        //JS改变路由.注意：如果需要用JS的方式切换路由，需要调用withRouter函数，并传入对应的路由根组件
        this.props.history.push("/");
    }
    render() {
        return<div className="baselayout">
            <header>
                <h2>这是BaseLayout</h2>
                <ul>
                    {/*
                       Link组件   路由切换组件，类似vue里的router-link，负责切换路由
                       to属性：表示需要跳转的路由
                    */}
                    <li>
                        <button onClick={this.toHome}>首页</button>
                    </li>
                    <li>
                        {/*params，直接将需要传递的值以/的形式继续拼接在url网址的后面,to属性的值是一个字符串*/}
                        <Link to={"/entertainment/"+this.state.id+"/"+this.state.name}>娱乐</Link>
                    </li>
                    <li>
                        {/*query，to属性的属性值不再是一个字符串，而是一个对象*/}
                        <Link to={{pathname:'/pe',query:{id:this.state.id,name:this.state.name,obj1:this.state.obj1}}}>体育</Link>
                    </li>
                    <li>
                        <Link to={{pathname:'/hot',state:{id:this.state.id,obj1:this.state.obj1}}}>热点</Link>
                    </li>
                    <li>
                        <Link to="/military">军事</Link>
                    </li>
                </ul>
            </header>
            <section>
                {/*Route组件,  路由的展示组件，类似vue里的router-view,负责展示路由切换的组件*/}
                {/*
                   path属性：字符串，用来匹配路由
                   component属性，当匹配上对应路由时需要显示的组件
                   exact属性，指明该路由是否排他
                */}
                <Route path="/" exact component={Home}/>
                {/*params传值，需要配置路由*/}
                <Route path="/entertainment/:id/:name" component={Eentertainment}/>
                <Route path="/pe" component={Pe}/>
                <Route path="/hot" component={Hot}/>
                <Route path="/military" component={Military}/>
            </section>
        </div>
    }
}

export default withRouter(Baselayout);
