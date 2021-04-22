import React, {Component} from 'react';

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            child2Msg:"这是child2组件的数据"
        }
        /*
            react里的class里的函数不会默认绑定this，需要我们手动绑定。
            1.可以在绑定事件时就改变this指向  eg：onClick={this.funName.bind(this)},但是这种写法每次函数调用时都会更改一次this指向，没有必要
            2.可以改变this指向的代码写到当前class的constructor方法里  eg：this.funName=this.funName.bind(this);这种写法只执行一次（建议用此写法）
           3.可以将绑定的函数直接写成箭头函数，箭头函数里的this不会被重置成undefined

           建议用第2种写法

           如果函数需要传参，语法：this.funName.bind(this,实参列表...)
           注意：此时，事件对象被放在了形参列表的最后，this不会被当做参数
         */
        this.sendMsgToApp=this.sendMsgToApp.bind(this)
    }
    sendMsgToApp(a,b,e){
      this.props.bindFunc(this.state.child2Msg)
    }
    render() {
        return <fieldset>
            <legend>这是child2组件</legend>
            <button onClick={this.sendMsgToApp}>点击向app传递数据</button>
        </fieldset>
    }
}

export default Child2;
