import React, {Component} from 'react';

class Child3 extends Component {
    constructor(props) {
        super(props);
        this.state={
            child3Msg:"这是child3的数据"
        }
        this.sendMsgToApp=this.sendMsgToApp.bind(this)
    }
    sendMsgToApp(){
        this.props.bindFunc(this.state.child3Msg)
    }
    render() {
        return <fieldset>
            <legend>这是child3组件</legend>
            <button onClick={this.sendMsgToApp}>点击向child4传值</button>
        </fieldset>
    }
}

export default Child3;
