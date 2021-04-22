import React, {Component} from 'react';
import "./CSSAnimation.css";
//引入动画模块中的CSSTransition组件
import {CSSTransition} from 'react-transition-group';
import CompOne from "./CompOne";

class CSSAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            slide: true,
            compShwo:true
        }
        //下面事件绑定一个变量，则要改变this的指向
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleCompToggle=this.handleCompToggle.bind(this)
    }

    ulStyle = {
        default: {
            listStyle: "none",
            background: "blue",
            overflow:"hidden"
        },
       active:{
            background: "yellow"
       }
    }

    handleToggle() {//setState有两个回调
        this.setState((previousState) => {
            return {
                show: !this.state.show
            }
        }, () => {
            console.log(this.state.show)
        });
    }

    handleSlide() {//setState有两个回调
        this.setState((previousState) => {
            return {
                slide: !this.state.slide
            }
        }, () => {
            console.log(this.state.slide)
        });
    }
    handleCompToggle() {//setState有两个回调
        this.setState((previousState) => {
            return {
                compShwo: !this.state.compShwo
            }
        }, () => {
            console.log(this.state.compShwo)
        });
    }
    render() {
        return <fieldset>
            <legend>React-CSS动画</legend>
            <CSSTransition
                in={this.state.show} //通过监听show变量的值，执行进入/离开动画
                timeout={1000}//动画执行的时间
                classNames="fade"//自定义的类名
                onEntered={(el) => {
                    el.style.color = "red";//可选，进入动画执行完毕之后触发的回调 ，el表示做动画的dom元素
                }}
                onExited={() => {
                    console.log("离开动画执行完毕");//可选，离开动画执行完毕之后执行的回调，可以设置state
                }}
            >
                <p>Hello,React</p>
            </CSSTransition>
            <button onClick={this.handleToggle}>控制元素显隐</button>
            <hr/>
            <button onClick={this.handleSlide}>控制上拉下拉</button>
            <CSSTransition
                in={this.state.slide}
                classNames="slide"
                timeout={1000}
            >
                <ul style={{...this.ulStyle['default']}}>
                    <li onClick={this.handleSlide}>>列表项1</li>
                    <li onClick={this.handleSlide}>>列表项2</li>
                    <li onClick={this.handleSlide}>>列表项3</li>
                    <li onClick={this.handleSlide}>>列表项4</li>
                    <li onClick={this.handleSlide}>>列表项5</li>
                    <li onClick={this.handleSlide}>>列表项6</li>
                </ul>
            </CSSTransition>
            <hr/>
            <button onClick={this.handleCompToggle}>点击控制组件显隐</button>
            <CSSTransition
            in={this.state.compShwo}
            timeout={1000}
            classNames='comp'
            >
                <CompOne/>
            </CSSTransition>
        </fieldset>
    }
}

export default CSSAnimation;
