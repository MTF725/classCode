import React, {Component} from 'react';

class Child4 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <fieldset>
            <legend>这是child4组件</legend>
            <p>接收从child3传入的值是：{this.props.child3Msg}</p>
        </fieldset>
    }
}

export default Child4;
