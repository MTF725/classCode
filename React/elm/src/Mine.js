import React, {Component} from 'react';
import {Menu, Dropdown, Icon} from 'antd';
import "./Mine.css"

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "登录/注册",
            balance: "0.00",
            point: "0",
            gift_amount: "0",
            mobile: "暂无绑定手机号",
            headimg: "",
            toAccount: true
        }
    }

//跳转到账户页面
    toAccount() {
        if (this.state.toAccount) {
            this.props.history.push("/account")
        } else {
            this.props.history.push("/login")
        }


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
            if (data.status == "0") {
                this.setState(prevState => {
                    return {
                        toAccount: !prevState.toAccount
                    }
                }, () => {
                    console.log(this.state.toAccount);
                })
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <div className="mine">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">我的</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*第一部分*/}
            <div className="mine-part1" onClick={this.toAccount.bind(this)}>
                <div className="mine-part-left">
                    <img src={this.state.headimg == "" ? require("../img/header0.png") : this.state.headimg} alt=""/>
                    <div className="mine-part-mid">
                        <p>{this.state.username}</p>
                        <div>
                            <img src={require("../img/phone.png")} alt=""/>
                            <span>{this.state.mobile == "" ? "暂无绑定手机号" : this.state.mobile}</span>
                        </div>
                    </div>
                </div>
                <Icon type="right" style={{color: "white"}}/>
            </div>
            {/*第二部分*/}
            <div className="mine-part2">
                <div>
                    <p><span>{this.state.balance == "" ? "0.00" : this.state.balance}</span>元</p>
                    <p>我的余额</p>
                </div>
                <div>
                    <p><span>{this.state.gift_amount}</span>个</p>
                    <p>我的优惠</p>
                </div>
                <div>
                    <p><span>{this.state.point}</span>分</p>
                    <p>我的积分</p>
                </div>

            </div>
            {/*第三部分*/}
            <ul className="mine-part3">
                <li>
                    <div><img src={require("../img/order.png")} alt=""/></div>
                    <div><p>我的订单</p> <Icon type="right" style={{color: "grey"}}/></div>
                </li>
                <li>
                    <div><img src={require("../img/integralshop.png")} alt=""/></div>
                    <div><p>积分商城</p> <Icon type="right" style={{color: "grey"}}/></div>
                </li>
                <li>
                    <div><img src={require("../img/VIP.png")} alt=""/></div>
                    <div><p>饿了么会员卡</p> <Icon type="right" style={{color: "grey"}}/></div>
                </li>
            </ul>
            {/*第四部分*/}
            <ul>
                <ul className="mine-part3">
                    <li>
                        <div><img src={require("../img/ques.png")} alt=""/></div>
                        <div><p>服务中心</p> <Icon type="right" style={{color: "grey"}}/></div>
                    </li>
                    <li>
                        <div><img src={require("../img/elmlogo.png")} alt=""/></div>
                        <div><p>下载饿了么APP</p> <Icon type="right" style={{color: "grey"}}/></div>
                    </li>
                </ul>
            </ul>
        </div>
    }
}

export default Mine;
