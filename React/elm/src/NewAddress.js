import React, {Component} from 'react';
import "./NewAddress.css"

class NewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "1111111111111111111",
            area: "1111111111111111111",
            detialaddress: "111111111111111111",
            phone: "11111111111",
            standbyPhone: "11111111111",
        }
    }

//获取姓名
    getName(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                name: a
            }
        }, () => {
            console.log(this.state.name);

        })
    }

//获取地区
    getarea(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                area: a
            }
        }, () => {
        })
    }

//获取详细地址
    getDetialaddress(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                detialaddress: a
            }
        }, () => {
            // console.log(this.state.detialaddress);
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

//获取备用手机号
    getDtandbyPhone(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                standbyPhone: a
            }
        }, () => {
            // console.log(this.state.standbyPhone);
        })
    }

//新增地址点击事件
    newOne() {
      
    }

    componentWillMount() {
        console.log(this.state.detialaddress.length);
    }

    render() {
        return <div className="newaddress">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">新增地址</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            <ul className="newaddress-part1">
                <li>
                    <input type="text"
                           placeholder="请填写你的姓名"
                           onChange={this.getName.bind(this)}
                           style={this.state.name.length <= 0 ? {borderColor: "#ea3106"} : null}
                    />
                    {
                        console.log(this.state.detialaddress.length)
                    }
                </li>
                <p style={this.state.name.length <= 0 ? {display: "block"} : null}
                >请填写你的姓名</p>
                <li>
                    <input type="text" placeholder="小区/写字楼/学校等" onChange={this.getarea.bind(this)}/>
                </li>
                <li>
                    <input type="text"
                           placeholder="请填写详细送餐地址"
                           onChange={this.getDetialaddress.bind(this)}
                           style={(this.state.detialaddress.length <= 0 || (this.state.detialaddress.length <= 2 && this.state.detialaddress.length > 0)) ? {borderColor: "#ea3106"} : null}
                    />
                </li>
                <p style={(this.state.detialaddress.length <= 2 && this.state.detialaddress.length > 0) ? {display: "block"} : null}
                >请详细填写送餐地址</p>
                <p style={this.state.detialaddress.length <= 0 ? {display: "block"} : null}
                >送餐地址太短了，不能辨识</p>
                <li>
                    <input type="text"
                           placeholder="请填写能够练习到您的手机号"
                           onChange={this.getPhone.bind(this)}
                           style={this.state.phone.length == 11 ? null : {borderColor: "#ea3106"}}
                    />
                </li>
                <p style={this.state.phone.length == 11 ? null : {display: "block"}}
                >请输入正确手机号</p>
                <li>
                    <input type="text" placeholder="备用练习电话(选填)" onChange={this.getDtandbyPhone.bind(this)}/>
                </li>
                <p style={this.state.standbyPhone.length == 11 ? null : {display: "block"}}
                >请输入正确手机号</p>
            </ul>
            <div className="newaddress-part2">
                <p onClick={this.newOne.bind(this)}>新增地址</p>
            </div>
        </div>
    }
}

export default NewAddress;
