import React, {Component} from 'react';
import "./Entertainment.css"
class Eentertainment extends Component {
    constructor(props) {
        super(props);
        //params方式传值，会存储在对应组件的this.props.match.params对象里
        console.log(this.props.match.params)
    }

    render() {
        return <div>
          <h2>这是娱乐组件</h2>
            <p>id值是:{this.props.match.params.id}</p>
            <p>name值是:{this.props.match.params.name}</p>
        </div>
    }
}

export default Eentertainment;
