import React, {Component} from 'react';
import "./Home.css"
class Hot extends Component {
    constructor(props) {
        super(props);
        //state方式传值:通过this.props.location.state对象
        console.log(this.props.location.state)
    }

    render() {
        return <div>
            <h2> 这是体育组件</h2>
            <p>id值是：{this.props.location.state.id}</p>
            <p>obj1的姓名是：{this.props.location.state.obj1.name},性别是：{this.props.location.state.obj1.sex}</p>
        </div>
    }
}

export default Hot;
