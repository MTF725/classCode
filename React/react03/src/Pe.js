import React, {Component} from 'react';
import "./Pe.css"

class Pe extends Component {
    constructor(props) {
        super(props);
        //query方式传值，值存储在对应组件的this.props.location.query对象里
        console.log(this.props.location.query)
    }

    render() {
        return <div>
            <h2> 这是体育组件</h2>
            <p>id值是：{this.props.location.query.id}</p>
            <p>name值是：{this.props.location.query.name}</p>
            <p>obj1的姓名是：{this.props.location.query.obj1.name}，年龄是：{this.props.location.query.obj1.age}，性别是：{this.props.location.query.obj1.sex}</p>
        </div>
    }
}

export default Pe;
