import React, {Component} from 'react';
import "./Store.css";
// import ReactDOM from 'react-dom';
import {DatePicker, message, Icon} from 'antd'

//http://elm.cangdu.org/shopping/restaurant/1?latitude=34.44853&longitude=113.05147 商品头
//http://elm.cangdu.org/shopping/v2/menu?restaurant_id=1 商品
class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            storehead: {},
            storeproducts: [],
            anchor: "",
            cart: "0.00",
            green: false,
            cartOut: "-9999px",
            cartIn: "2.34rem",
            showCart: false,
            chooseProNum: 0
        }
        this.proCounts = this.proCounts.bind(this)
    }

//跳转到确认订单页面并传参
    toOrderSure() {
        let a = ["fromStore"];
        if (this.state.green) {
            this.props.history.push("/ordersure/"+JSON.stringify(a))
        }
    }

//弹出购物车商品详情
    showCart() {
        if (this.state.green) {
            this.setState(prevState => {
                return {
                    showCart: !this.state.showCart
                }
            })
        }
    }

//锚点点击事件
    toProduct(i) {
        this.setState(prevState => {
            return {
                anchor: i
            }
        }, () => {

        })
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
                            cart: (prevState.cart * 1) + (z.pCount * z.specfoods[0].price * 1)
                        }
                    }, () => {
                        // console.log(this.state.cart);
                    })
                }
            })
        })
    }

//判断是否有选中商品
    hasPro() {
        let a = false
        this.state.storeproducts.map(x => {
            x.foods.map(z => {
                if (z.pCount) {
                    a = true
                }
            })
        })
        this.setState(prevState => {
            return {
                green: a,
            }
        }, () => {
            console.log("green是" + this.state.green);
        })
    }

//添加商品事件
    addToCart(v1) {
        this.state.storeproducts.map(x => {
            x.foods.map(z => {
                if (JSON.stringify(z) == JSON.stringify(v1)) {
                    // console.log(z)
                    //判断=右边的z.pCount，如果没有z.pCount这个属性，则是undefined，转成布尔值为false，！false等于true，那么z.pCount=1；如果有z.pCount这个属性，则是z.pCount的值，转成布尔值时true，！true等于false，那么z.pCount=z.pCount+1
                    z.pCount = !z.pCount ? 1 : z.pCount + 1;
                    // console.log(z.pCount);
                }
            })
        })
        this.setState({
            storeproducts: this.state.storeproducts,
        }, () => {
            //判断是否有选中商品
            this.hasPro()
            //计算购物车商品总价
            this.proCounts()
        })
        //保存到本地：
        if (localStorage.getItem("storeproducts")) {
            localStorage.removeItem("storeproducts")
        }
        localStorage.storeproducts = JSON.stringify(this.state.storeproducts)
        // console.log(this.state.cart)
    }

//清空购物车点击事件
    clearCart() {
        localStorage.removeItem("storeproducts");
        this.state.storeproducts.map(v => {
            v.foods.map(i => {
                i.pCount = 0
            })
        })
        this.setState({
            storeproducts: this.state.storeproducts
        }, () => {
            this.proCounts()
            this.hasPro()
            this.showCart()
        })
    }

//删除购物车商品点击事件
    deletePro(v1) {
        this.state.storeproducts.map(x => {
            x.foods.map(z => {
                if (JSON.stringify(z) == JSON.stringify(v1) && z.pCount > 0) {
                    z.pCount--
                }
            })
        })
        this.setState({
            storeproducts: this.state.storeproducts
        }, () => {
            //判断是否有选中商品
            this.hasPro()
            //计算购物车商品总价
            this.proCounts()
        })
        //保存到本地：
        if (localStorage.getItem("storeproducts")) {
            localStorage.removeItem("storeproducts")
        }
        localStorage.storeproducts = JSON.stringify(this.state.storeproducts)
        // console.log(this.state.cart)
    }

    componentWillMount() {
        //获取从AllStore发送的商铺信息
        this.setState(prevState => {
            return {
                store: JSON.parse(this.props.match.params.store)
            }
        }, () => {
            // console.log(this.state.store)
        })

//请求商品头数据
        fetch(`http://elm.cangdu.org/shopping/restaurant/1?latitude=${this.state.store.latitude}&longitude=${this.state.store.longitude}`).then((res) => {
            return res.json()
        }).then((data) => {
            this.setState(prevState => {
                return {
                    storehead: data
                }
            }, () => {
                console.log(this.state.storehead);
            })
        }).catch(err => {
            console.log(err)
        })
//请求商品信息
        fetch(`http://elm.cangdu.org/shopping/v2/menu?restaurant_id=1`).then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    storeproducts: data
                }
            }, () => {
                // console.log(this.state.storeproducts)
                //获取本地存储的商品信息
                // console.log(localStorage.getItem("storeproducts"))
                if (localStorage.getItem("storeproducts")) {
                    this.setState({
                        storeproducts: JSON.parse(localStorage.getItem("storeproducts"))
                    }, () => {
                        console.log(this.state.storeproducts)
                        //计算购物车商品总价
                        this.proCounts()
                        //判断是否有选中商品
                        this.hasPro()
                    })
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return <div className="cp-store">
            {/*商铺头部*/}
            <div className="store-header">
                <div className="store-header-top">
                    <img src={"http://elm.cangdu.org/img/" + this.state.storehead.image_path} alt=""/>
                    <div className="store-header-right">
                        <p className="store-header-line1"><span>{this.state.storehead.name}</span></p>
                        <p className="store-header-line2">商家配送/分钟送达/配送费￥{this.state.storehead.float_delivery_fee}</p>
                        <p className="store-header-line3">公告：{this.state.storehead.promotion_info}</p>
                    </div>
                </div>
            </div>
            {/*商铺导航栏*/}
            <div className="store-nav">
                <p>商品</p><p>评价</p>
            </div>
            {/*空div*/}
            <div className="store-empty"></div>
            {/*商铺详情*/}
            <div className="store-pros">
                {/*商品详情左部*/}
                <ul className="store-pros-left">
                    {this.state.storeproducts.map((v, i) => {
                        return <li key={i} style={{
                            borderLeft: this.state.anchor == i ? "0.3rem solid #3190e8" : "0",
                            background: this.state.anchor == i ? "white" : "#f5f5f5"
                        }}><a href={"#" + this.state.anchor}
                              onClick={this.toProduct.bind(this, i)}>{v.name}</a></li>
                    })}
                </ul>
                {/*商品详情右部*/}
                <div className="store-pros-right">
                    {this.state.storeproducts.map((v, i) => {
                        return <a key={i} name={i}>
                            <a className="store-title">
                                <p>{v.name}</p><span>{v.description}</span>
                            </a>
                            {
                                v.foods.map((v1, i1) => {
                                    return <li key={i1} className="store-foods">
                                        <img src={"http://elm.cangdu.org/img/" + v1.image_path} alt=""/>
                                        <div className="store-foods-right">
                                            <p>{v1.name}</p>
                                            <p>{v1.description}</p>
                                            <p>月售{v1.month_sales}<span>好评率{v1.satisfy_rate}</span></p>
                                            <p style={{display: v1.activity != null ? "black" : "none"}}>{v1.activity != null ? v1.activity.image_text : null}</p>
                                            <div className="store-kinds">
                                                <p>{v1.specfoods.length > 1 ? "￥" + v1.specfoods[0].price + "起" : "￥" + v1.specfoods[0].price}</p>
                                                <p style={{display: v1.specfoods.length > 1 ? "block" : "none"}}>{v1.specfoods.length > 1 ? "选规格" : null}</p>
                                                <div style={{display: v1.specfoods.length > 1 ? "none" : "flex"}}>
                                                    <Icon
                                                        onClick={this.deletePro.bind(this, v1)}
                                                        type="minus-circle"
                                                        style={{
                                                            fontSize: 16,
                                                            color: '#3190e8',
                                                            display: v1.pCount > 0 ? "block" : "none"
                                                        }}/>
                                                    <span style={{
                                                        display: v1.pCount > 0 ? "block" : "none"
                                                    }}>{v1.pCount}</span>
                                                    <Icon
                                                        onClick={this.addToCart.bind(this, v1)}
                                                        type="plus-circle"
                                                        style={{
                                                            fontSize: 16,
                                                            color: '#3190e8',
                                                            display: v1.specfoods.length > 1 ? "none" : "block"
                                                        }}/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </a>
                    })}
                </div>
            </div>
            {/*底部*/}
            <div className="store-foot">
                <div className="store-foot-price" onClick={this.showCart.bind(this)}>
                    <p>￥{this.state.cart}</p>
                    <p>配送费￥5</p>
                </div>
                <div style={{background: this.state.green == true ? "green" : " #3d3d3f"}}
                     className="store-foot-sure"
                     onClick={this.toOrderSure.bind(this)}>
                    {this.state.green == true ? "去结算" : "还差￥20起送"}
                </div>
                <Icon type="shopping-cart" style={{background: this.state.green == true ? "#3190e8" : " #3d3d3f"}}
                      className="store-foot-cart"/>
            </div>
            {/*购物车商品详情*/}
            <div
                className="store-cart-des"
                style={{bottom: this.state.showCart == true ? this.state.cartIn : this.state.cartOut}}>
                <div className="store-cart-title">
                    <p>购物车</p>
                    <div>
                        <img src={require("../img/clear.png")} alt=""/>
                        <p onClick={this.clearCart.bind(this)}>清空</p>
                    </div>
                </div>
                <ul className="store-cart-content">
                    {
                        this.state.storeproducts.map((v, i) => {
                            return v.foods.map((v1, i1) => {
                                return <li key={i1} style={{display: v1.pCount > 0 ? "flex" : "none"}}>
                                    <div>{v1.name}</div>
                                    <div>￥{v1.specfoods[0].price}</div>
                                    <div>
                                        <Icon
                                            onClick={this.deletePro.bind(this, v1)}
                                            type="minus-circle"
                                            style={{
                                                fontSize: 16,
                                                color: '#3190e8',
                                                display: v1.pCount > 0 ? "block" : "none"
                                            }}/>
                                        <span style={{
                                            display: v1.pCount > 0 ? "block" : "none"
                                        }}>{v1.pCount}</span>
                                        <Icon
                                            onClick={this.addToCart.bind(this, v1)}
                                            type="plus-circle"
                                            style={{
                                                fontSize: 16,
                                                color: '#3190e8',
                                                display: v1.specfoods.length > 1 ? "none" : "block"
                                            }}/>
                                    </div>
                                </li>
                            })
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default Store;
