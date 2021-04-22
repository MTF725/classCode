import React, {Component} from 'react';
import "./AddToAddress.css"

class AddToAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            aera: "",
            desAddress: "",
            lable: "",
            man: true,
            woman: false,
        }
    }

//把地址信息发送给确认订单页面
    sendMsgToOrdersure() {
        let a = ["fromAddToAddress", {name: this.state.name}, {phone: this.state.phone}, {aera: this.state.aera}, {desAddress: this.state.desAddress}, {lable: this.state.lable}, {man: this.state.man}]
        if (this.state.name.length > 0 && this.state.phone.length > 0 && this.state.aera.length > 0 && this.state.desAddress.length > 0 && this.state.lable.length > 0) {
            this.props.history.push("/ordersure/" + JSON.stringify(a))
        }
    }

//更改对号颜色
    changeMan() {
        this.setState(prevState => {
            return {
                man: true,
                woman: false
            }
        })
    }

    changeWoMan() {
        this.setState(prevState => {
            return {
                man: false,
                woman: true
            }
        })
    }

//获取名字
    getName(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                name: a
            }
        }, () => {
            // console.log(this.state.name);
        })
    }

//获取手机号
    getPhone(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                phone: a
            }
        }, () => {
            // console.log(this.state.phone);
        })
    }

//获取地区
    getAera(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                aera: a
            }
        }, () => {
            // console.log(this.state.aera);
        })
    }

//获取详细地址
    getDesAddress(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                desAddress: a
            }
        }, () => {
            // console.log(this.state.desAddress);
        })
    }

//获取标签
    getLable(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                lable: a
            }
        }, () => {
            // console.log(this.state.lable);
        })
    }

    render() {
        return <div className="addtoaddress">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">添加地址</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*第一部分*/}
            <ul className="addtoaddress-part1">
                <li>
                    <p>联系人</p>
                    <div>
                        <div><input type="text" placeholder="你的名字" onChange={this.getName.bind(this)}/></div>
                        <div>
                            <p onClick={this.changeMan.bind(this)}>
                                <img
                                    src={this.state.man ? require("../img/duihaogreen.png") : require("../img/duihaogrey.png")}
                                    alt=""/>先生
                            </p>
                            <p onClick={this.changeWoMan.bind(this)}>
                                <img
                                    src={this.state.woman ? require("../img/duihaogreen.png") : require("../img/duihaogrey.png")}
                                    alt=""/>女士
                            </p>
                        </div>
                    </div>
                </li>
                <li>
                    <p>联系电话</p>
                    <div><input
                        type="text"
                        placeholder="你的手机号"
                        onChange={this.getPhone.bind(this)}
                    /></div>
                </li>
                <li>
                    <p>送餐地址</p>
                    <div>
                        <div><input type="text" placeholder="小区/写字楼/学校等" onChange={this.getAera.bind(this)}/></div>
                        <div><input type="text" placeholder="详细地址(如门牌号等)" onChange={this.getDesAddress.bind(this)}/>
                        </div>
                    </div>
                </li>
                <li>
                    <p>标签</p>
                    <div><input type="text" placeholder="无/家/学校/公司" onChange={this.getLable.bind(this)}/></div>
                </li>
            </ul>
            {/*第二部分*/}
            <div
                className="addtoaddress-part2"
                onClick={this.sendMsgToOrdersure.bind(this)}
            ><p>确定</p></div>
        </div>
    }
}

export default AddToAddress;
