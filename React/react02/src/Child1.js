import React, {Component} from 'react';

class Child1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <fieldset disabled>
            <legend>Child1组件</legend>
            <p>接收从app传入的值是：{this.props.child1Msg}</p>
        </fieldset>
    }
}

export default Child1;
