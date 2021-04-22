import React, {Component} from 'react';
import {Icon} from "antd";
import "./Account.css"
import "animate.css/animate.css"

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "登录/注册",
            balance: "0.00",
            point: "0",
            gift_amount: "0",
            mobile: "暂无绑定手机号",
            headimg: "",
            showAlertWindow: false,
            dark:false
        }
    }
//跳转到收货地址页面
    toAddress(){
        this.props.history.push("/newaddress")
    }
//警告弹框
    alertWindow() {
        this.setState(prevState => {
            return {
                showAlertWindow: !prevState.showAlertWindow,
                dark:!prevState.dark
            }
        })
    }
 //跳转到更改密码页面
    toChangePassword(){
        let a =JSON.stringify(this.state.username)
        this.props.history.push("/changepassword/"+a)
    }
//退出登录
    logout(){
       fetch("https://elm.cangdu.org/v2/signout").then(res=>{
           res.json()
       }) .then(data=>{
           // console.log(data);
       }).catch(err=>{
           console.log(err);
       })
        this.props.history.push("/mine")
        this.alertWindow()
    }
    componentWillMount() {
//获取账户信息
        fetch("https://elm.cangdu.org/v1/user", {
                method: "get",
                credentials: 'include'
            },
        ).then(res => {
            return res.json()
        }).then(data => {
            if (data.__v == "0") {
                this.setState(prevState => {
                    return {
                        username: data.username,
                        mobile: data.mobile,
                        balance: data.balance,
                        gift_amount: data.gift_amount,
                        point: data.point,
                        headimg: "//elm.cangdu.org/img/" + data.avatar
                    }
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <div className="account">
            <div className="account-dark" style={this.state.dark?{display:"block"}:null}></div>
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">账户信息</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*第一部分*/}
            <div className="account-part1">
                <ul>
                    <li>
                        <div>
                            <p>头像</p>
                            <div><img src={this.state.headimg} alt=""/><Icon type="right"
                                                                             style={{color: "grey"}}/></div>
                        </div>
                    </li>
                    <input type="file"/>
                    <li>
                        <p>用户名</p>
                        <div>
                            <p>{this.state.username}</p>
                            <Icon type="right" style={{color: "grey"}}/>
                        </div>
                    </li>
                    <li onClick={this.toAddress.bind(this)}>
                        <p>收货地址</p>
                        <div>
                            <p></p>
                            <Icon type="right" style={{color: "grey"}}/>
                        </div>
                    </li>
                </ul>
            </div>
            {/*第二部分*/}
            <div className="account-part2">
                <div>账户绑定</div>
                <div>
                    <div><img src={require("../img/phone.png")} alt=""/></div>
                    <div><p>手机</p><Icon type="right" style={{color: "grey"}}/></div>
                </div>
            </div>
            {/*第三部分*/}
            <div className="account-part3">
                <div>安全设置</div>
                <div onClick={this.toChangePassword.bind(this)}>
                    <div>登录密码</div>
                    <div><p>修改</p><Icon type="right" style={{color: "grey"}}/></div>
                </div>
            </div>
            {/*第四部分*/}
            <div className="account-part4">
                <p onClick={this.alertWindow.bind(this)}>退出登录</p>
            </div>
            {/*弹窗2*/}
            <div className="account-part5-a" style={{display: this.state.showAlertWindow ? "flex" : "none"}}>
                <div className="account-part5 box animated heartBeat">
                    <img src={require("../img/gantanhao.png")} alt=""/>
                    <p>是否退出登录</p>
                    <div>
                        <p onClick={this.alertWindow.bind(this)}>再等等</p>
                        <p onClick={this.logout.bind(this)}>退出登录</p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Account;
