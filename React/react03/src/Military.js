import React, {Component} from 'react';
import "./Military.css"
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import Missile from "./Missile";
import Rocket from "./Rocket";

class Military extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="military">
            <div className="left">
                <Link to="/military/missile">导弹新闻</Link>
                <Link to="/military/rocket">火箭新闻</Link>
            </div>
            <div className="right">
                {/*
                   路由重定向在react里需要用到Switch和Redirect组件,Redirect组件要用Switch包裹起来
                */}
                <Switch>
                    <Redirect exact from="/military" to="/military/missile"/>
                </Switch>
                <Route path="/military/missile" component={Missile}/>
                <Route path="/military/rocket" component={Rocket}/>
            </div>
        </div>
    }
}

export default Military;
