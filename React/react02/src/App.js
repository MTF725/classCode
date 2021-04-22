import React, {Component} from 'react';
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child3 from "./Child3";
import Child4 from "./Child4";
import Request from "./Request";

//凡是引入自己的组件，哪怕是同级，都要./开头

//创建一个theme Context


class App extends Component {//创建一个叫App的类，继承了Component，所以App就成了一个组件
    constructor(props) {//创建一个构造函数,每次创建组件时都会触发一次
        super(props);//super(props)调用所有的父类的方法
        //在此处初始化state
        this.state = {
            appMsg: "这是app的数据",
            getChild2M: "",
            getChild3M: "",
        }
    }

    //给child2组件创建一个对象属性，key是bindFunc，value是一个函数{(v)=>{this.setState({getChild2M:v})}}
    //或者写成bindFunc={(v)=>{this.dealChild2Msg(v)}}，value中调用dealChild2Msg（v）方法。（箭头函数不用在重定this指向）
    dealChild2Msg(v) {
        this.setState({getChild2M: v})
    }

    dealChild3Msg(v) {
        this.setState({getChild3M: v})
    }

    render() {
        return (<div>
                <h2>接收从child2传来的数据：{this.state.getChild2M}</h2>
                <Child1 child1Msg={this.state.appMsg}/>
                <Child2 bindFunc={(v) => {
                    this.setState({getChild2M: v})
                }}/>
                <Child2 bindFunc={(v) => {
                    this.dealChild2Msg(v)
                }}/>
                <Child3 bindFunc={(v) => {
                    this.dealChild3Msg(v)
                }}/>
                <Child4 child3Msg={this.state.getChild3M}/>
                <Request/>
            </div>
        );
    }
}

export default App;
