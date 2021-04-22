import React, {Component} from 'react';
import "./OrderSure.css"
import {Icon} from "antd"

class OrderSure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgNewAddress: [1],
            storeproducts: [],
            cart: "",
            orderRemark: []
        }
    }

//计算购物车商品总价：
    proCounts() {
        this.setState(prevState => {
            return {
                cart: "0"
            }
        })
        // console.log(this.state.storeproducts)
        this.state.storeproducts.map(x => {
            x.foods.map(z => {
                // console.log(z)
                if (z.pCount) {
                    this.setState(prevState => {
                        return {
                            cart: (prevState.cart * 1) + (z.pCount * z.specfoods[0].price * 1) + 4 + 1010.5
                        }
                    }, () => {
                        // console.log(this.state.cart);
                    })
                }
            })
        })
    }

//跳转到添加地址页面
    toAddToAddress() {
        this.props.history.push("/addtoaddress")
    }

//跳转到订单备注页面
    toOrderRemake() {
        this.props.history.push("/orderremake")
    }

    componentWillMount() {
        this.state.msgNewAddress = [1]
        // console.log(JSON.parse(this.props.match.params.addressmsg)[0]=="fromStore")
        this.setState(prevState => {
            return {
                storeproducts: JSON.parse(localStorage.getItem("storeproducts"))
            }
        })


//接收地址信息
        if (JSON.parse(this.props.match.params.addressmsg)[0] == "fromAddToAddress") {
            this.setState(prevState => {
                return {
                    msgNewAddress: JSON.parse(this.props.match.params.addressmsg)
                }
            }, () => {
                console.log(this.state.msgNewAddress);
            })
        }
//从本地获取商品信息
            this.setState(prevState => {
                return {
                    storeproducts: JSON.parse(localStorage.getItem("storeproducts"))
                }
            }, () => {
                this.proCounts()
                // console.log(this.state.storeproducts);
            })

//接收备注信息
        if (JSON.parse(this.props.match.params.addressmsg)[0] == "fromOrderRemake") {
            this.setState(prevState => {
                return {
                    orderRemark: JSON.parse(this.props.match.params.addressmsg)
                }
            }, () => {
                console.log(this.state.orderRemark);
            })
        }
    }

    render() {
        return <div className="ordersure">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">确认订单</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty">
            </div>
            {/*第一部分*/}
            <div className="ordersure-part1" onClick={this.toAddToAddress.bind(this)}
                 style={this.state.msgNewAddress[0] == "1" ? {opacity: 1} : {opacity: 0}}>
                <div>
                    <Icon type="environment-o" style={{color: "#3190e8"}}/>
                    <p>请添加一个收货地址</p>
                </div>
                <Icon type="right"/>
            </div>
            {/*收货地址*/}
            <div className="ordersure-address"
                 style={this.state.msgNewAddress[0] == "1" ? {display: "none"} : {display: "flex"}}>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : this.state.msgNewAddress[1].name}</p>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : this.state.msgNewAddress[2].phone}</p>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : this.state.msgNewAddress[3].aera}</p>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : this.state.msgNewAddress[4].desAddress}</p>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : this.state.msgNewAddress[5].label}</p>
                <p>{this.state.msgNewAddress[0] == "1" ? "" : (this.state.msgNewAddress[6].man ? "男士" : "女士")}</p>
            </div>
            {/*第二部分*/}
            <div className="ordersure-part2">
                <p>送达时间</p>
                <div>
                    <p>尽快送达|预计20:11</p>
                    <p><span>蜂鸟专送</span></p>
                </div>
            </div>
            {/*第三部分*/}
            <div className="ordersure-part3">
                <div>
                    <p>支付方式</p>
                    <p><span>在线支付</span><Icon type="right"/></p>
                </div>
                <div>
                    <p>红包</p>
                    <p>暂时只在饿了么APP中支持</p>
                </div>
            </div>
            {/*第四部分*/}
            <div className="ordersure-part4"></div>
            {/*第五部分*/}
            <div className="ordersure-pros">
                <div>
                    <img src="http://elm.cangdu.org/img/164ad0b6a3917599.jpg" alt=""/>
                    <p>效果演示</p>
                </div>
                <ul>
                    {
                        this.state.storeproducts.map((v, i) => {
                            return v.foods.map((v1, i1) => {
                                return <li key={i1} style={{display: v1.pCount > 0 ? "flex" : "none"}}>
                                    <div className="ordersure-pros-v1">
                                        <p>{v1.name}</p>
                                        <div>
                                            <p>*{v1.pCount}</p>
                                            <p>￥{v1.specfoods[0].price}</p>
                                        </div>
                                    </div>
                                </li>
                            })
                        })
                    }
                </ul>
                <div><p>餐盒</p><p>￥1010.5</p></div>
                <div><p>配送费</p><p>￥4</p></div>
            </div>
            {/*第六部分*/}
            <ul className="ordersure-part5">
                <li onClick={this.toOrderRemake.bind(this)}>
                    <p>订单备注</p>
                    <div>
                        <p>
                            { this.state.orderRemark.length==0?null:
                                this.state.orderRemark[1].map((v, i) => {
                                    return <span key={i}>
                                        {v};
                                </span>
                                })
                            }
                            <span>口味、偏好等</span>
                        </p>
                        <Icon type="right"/>
                    </div>
                </li>
                <li>
                    <p>发票抬头</p>
                    <p><span>不需要开发票</span><Icon type="right"/></p>
                </li>
            </ul>
            {/*底部*/}
            <div className="ordersure-foot">
                <p>待支付￥{this.state.cart}</p>
                <p>确定下单</p>
            </div>
        </div>
    }
}

export default OrderSure;
