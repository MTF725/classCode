import React, {Component} from 'react';
import {Menu, Dropdown, Icon} from 'antd';
//引入动画模块中的CSSTransition组件
import {CSSTransition} from "react-transition-group"
import "./Storekind.css"

const SubMenu = Menu.SubMenu;

class Storekind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classify: [],
            chooseClassifyNun: "0",
            chooseKind: [],
            chooseKindNum: "0",
            dropdownLeft: false,
            dropdownMid: false,
            storeMsg: [],
            chooseFoodName: "分类",
        }
    }

//选择排序方式
    chooseSort(i) {
        if (this.state.dropdownLeft) {
            this.showLeft()
        }
        this.setState(prevState => {
            return {
                chooseKindNum: i,
                dropdownMid:!prevState.dropdownMid
            }
        })
        //获取排序数据
        let a = i
        fetch(`http://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762/restaurant_category_id=1&order_by=${a}`).then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    storeMsg: data
                }
            },()=>{

            })
        }).catch(err => {
            console.log(err)
        })
    }

//跳转到商铺页面并传值
    toStore(v, i) {
        let a = JSON.stringify({
            latitude: this.state.storeMsg[i].latitude,
            longitude: this.state.storeMsg[i].longitude,
            id: this.state.storeMsg[i].id
        })
        this.props.history.push("/store/" + a)
    }

//选择食品种类：
    chooseKinds(i) {
        this.setState(prevState => {
            return {
                chooseKind: prevState.classify[i],
                chooseClassifyNun: i,
            }
        }, () => {
        })
    }

//细分食品种类
    choosefoods(id, name) {
        this.setState(prevState => {
            return{
                dropdownLeft:!prevState.dropdownLeft
            }
        })
        fetch(`http://elm.cangdu.org/shopping/restaurants?latitude=31.22299&longitude=121.36025&offset=0&limit=20&restaurant_category_ids[]=${id}`).then(res => {
            return res.json()
        }).then(data => {
            // console.log(data)
            this.setState(prevState => {
                return {
                    storeMsg: data,
                    chooseFoodName:name
                }
            }, () => {
                // console.log(this.state.chooseFoodName);
            })
        }).catch(err => {
            console.log(err);
        })
    }


//左下拉菜单
    showLeft() {
        if (this.state.dropdownMid) {
            this.showMid()
        }
        this.setState(prevState => {
            return {
                dropdownLeft: !prevState.dropdownLeft
            }
        }, () => {
            console.log(this.state.dropdownLeft);
        })
    }

//中下拉菜单
    showMid() {
        if (this.state.dropdownLeft) {
            this.showLeft()
        }
        this.setState(prevState => {
            return {
                dropdownMid: !prevState.dropdownMid
            }
        }, () => {
            // console.log(this.state.dropdownMid);
        })
    }

    componentWillMount() {
//获取商铺信息
        fetch(`https://elm.cangdu.org/shopping/restaurants?latitude=23.12497&longitude=113.26308`).then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    storeMsg: data
                }
            }, () => {
                // console.log(this.state.storeMsg)
            })
        }).catch(err => {
            console.log(err)
        })
//获取分类数据
        fetch("http://elm.cangdu.org/shopping/v2/restaurant/category").then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    classify: data
                }
            }, () => {
                // console.log(this.state.classify[0].sub_categories);
                //给chooseKind设默认值
                this.setState(prevState => {
                    return {
                        chooseKind: this.state.classify[0]
                    }
                }, () => {
                    // console.log(this.state.chooseKind)
                })
                // console.log(this.state.classify)
            })
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        return <div className="storekind">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">{}</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*下拉菜单标题*/}
            <div className="storekind-dropdown">
                <div className="storekind-dropdown-left" onClick={this.showLeft.bind(this)}>
                    <div
                        style={this.state.dropdownLeft ? {color: "#3e90e8"} : null}
                    >
                        <p>{this.state.dropdownLeft?"分类":this.state.chooseFoodName}</p>
                        <CSSTransition
                            in={this.state.dropdownLeft}
                            classNames="rotate"
                            timeout={300}
                        >
                            <Icon type="caret-down"/>
                        </CSSTransition>
                    </div>
                </div>
                <div className="storekind-dropdown-mid" onClick={this.showMid.bind(this)}>
                    <div style={this.state.dropdownMid ? {color: "#3e90e8"} : null}>
                        <p>排序</p>
                        <CSSTransition
                            in={this.state.dropdownMid}
                            classNames="rotate"
                            timeout={300}
                        >
                            <Icon type="caret-down"/>
                        </CSSTransition>
                    </div>
                </div>
                <div className="storekind-dropdown-right">
                    <div>
                        <p>筛选</p>
                        <Icon type="caret-down"/>
                    </div>
                </div>
            </div>
            {/*空*/}
            <div className="storekind-empty"></div>
            {/*左下拉菜单内容*/}
            <div className="storekind-dropdown-content1"
                 style={this.state.dropdownLeft ? {
                     height: "20rem",
                     opacity: "1",
                     transition: ".3s linear",
                     zIndex: "1000"
                 } : null}>
                <ul className="dropdown-content-left">
                    {this.state.classify.map((v, i) => {
                        return <li
                            key={i}
                            onClick={this.chooseKinds.bind(this, i)}
                            style={this.state.chooseClassifyNun == i ? {background: "white"} : null}
                        >
                            <div>
                                <img src={"https://fuss10.elemecdn.com/" + v.image_url} alt=""/>
                                <p>{v.name}</p>
                            </div>
                            <div>
                                <p>{v.count}</p>
                                <Icon type="right" style={{color: "#ccc", fontSize: "0.4rem"}}/>
                            </div>
                        </li>
                    })}
                </ul>
                <ul className="dropdown-content-right">
                    {this.state.chooseKind.length == 0 ? null : this.state.chooseKind.sub_categories.map((v, i) => {
                            return <li onClick={this.choosefoods.bind(this, v.id, v.name)}>
                                <p>{v.name}</p>
                                <p>{v.count}</p>
                            </li>
                        }
                    )}
                </ul>
            </div>
            {/*中下拉菜单内容*/}
            <ul className="storekind-dropdown-content2"
                style={this.state.dropdownMid ? {height: "15.15rem", opacity: "1", transition: ".3s linear"} : null}
            >
                <li onClick={this.chooseSort.bind(this, 1)}>
                    <div><img src={require("../img/paixu.png")} alt=""/></div>
                    <p
                        style={this.state.chooseKindNum == "1" ? {color: "#3e90e8"} : null}>
                        智能排序<Icon type="check"
                                  style={this.state.chooseKindNum == "1" ? {display: "block"} : {display: "none"}}/></p>
                </li>
                <li onClick={this.chooseSort.bind(this, 2)}>
                    <div><img src={require("../img/juli.png")} alt=""/></div>
                    <p
                        style={this.state.chooseKindNum == "2" ? {color: "#3e90e8"} : null}>
                        距离最近<Icon type="check"
                                  style={this.state.chooseKindNum == "2" ? {display: "block"} : {display: "none"}}/></p>
                </li>
                <li onClick={this.chooseSort.bind(this, 3)}>
                    <div><img src={require("../img/hot.png")} alt=""/></div>
                    <p style={this.state.chooseKindNum == "3" ? {color: "#3e90e8"} : null}>
                        销量最高<Icon type="check"
                                  style={this.state.chooseKindNum == "3" ? {display: "block"} : {display: "none"}}/></p>
                </li>
                <li onClick={this.chooseSort.bind(this, 4)}>
                    <div><img src={require("../img/qisongjia.png")} alt=""/></div>
                    <p style={this.state.chooseKindNum == "4" ? {color: "#3e90e8"} : null}>
                        起送价最低<Icon type="check"
                                   style={this.state.chooseKindNum == "4" ? {display: "block"} : {display: "none"}}/>
                    </p>
                </li>
                <li onClick={this.chooseSort.bind(this, 5)}>
                    <div><img src={require("../img/peisong.png")} alt=""/></div>
                    <p
                        style={this.state.chooseKindNum == "5" ? {color: "#3e90e8"} : null}>
                        配送速度最快<Icon type="check"
                                    style={this.state.chooseKindNum == "5" ? {display: "block"} : {display: "none"}}/>
                    </p>
                </li>
                <li onClick={this.chooseSort.bind(this, 6)}>
                    <div><img src={require("../img/pingfen.png")} alt=""/></div>
                    <p
                        style={this.state.chooseKindNum == "6" ? {color: "#3e90e8"} : null}>
                        评分最高<Icon type="check"
                                  style={this.state.chooseKindNum == "6" ? {display: "block"} : {display: "none"}}/></p>
                </li>
            </ul>
            {/*店铺信息*/}
            <div className="allstore-stores" style={{marginTop: "0"}}>
                <div className="title">
                    <img src={require("../img/store.png")} alt=""/>
                    <span>附近商家</span>
                </div>
                <ul>
                    {this.state.storeMsg.map((v, i) => {
                        return <li key={i} onClick={this.toStore.bind(this, v, i)}>{
                            <div className="store-msg">
                                <img src={"http://elm.cangdu.org/img/" + v.image_path} alt=""/>
                                <div className="store-des">
                                    <div className="store-line1">
                                        <p>品牌</p> <p>{v.name}</p> <p>保准票</p>
                                    </div>
                                    <div className="store-line2">
                                        <p></p><p>月售{v.recent_order_num}单</p> <p>{v.delivery_mode.text}</p><p>准时达</p>
                                    </div>
                                    <div className="store-line3">
                                        <p>￥{v.float_minimum_order_amount}起送/配送费约￥{v.float_delivery_fee}</p>
                                        <p>{v.distance}/<span>{v.order_lead_time}</span></p>
                                    </div>
                                </div>
                            </div>
                        }</li>
                    })}
                </ul>
            </div>
        </div>
    }
}

export default Storekind;
