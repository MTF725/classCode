import React, {Component} from 'react';
import "./ChangePassword.css"

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sureCode: "",
            username: "",
            accountNum: "",
            oddPassword: "",
            newPassword: "",
            sureNewPassword: "",
            sureCodeNum: "",
            alertMsg: "",
            showAlertWindow: false,
        }
    }

//获取账号输入内容
    accNum(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                accountNum: a
            }
        }, () => {
            // console.log(this.state.accountNum);
        })
    }

//获取旧密码输入内容
    oddpass(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                oddPassword: a
            }
        }, () => {
            // console.log(this.state.oddPassword);
        })
    }

//获取新密码输入内容
    newpass(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                newPassword: a
            }
        }, () => {
            // console.log(this.state.newPassword);
        })
    }

//获取确认密码输入内容
    sureNewPass(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                sureNewPassword: a
            }
        }, () => {
            // console.log(this.state.sureNewPassword);
        })
    }

//获取验证码输入内容
    sureNum(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                sureCodeNum: a
            }
        }, () => {
            // console.log(this.state.sureCodeNum);
        })
    }

//请求验证码
    getSureCode() {
        fetch("https://elm.cangdu.org/v1/captchas", {method: "post", credentials: 'include'}).then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    sureCode: data.code
                }
            }, () => {
                // console.log(this.state.sureCode)
            })
            // console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

//修改密码
    changePassword() {
        fetch("https://elm.cangdu.org/v2/changepassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                oldpassWord: this.state.oddPassword,
                newpassword: this.state.newPassword,
                confirmpassword: this.state.sureNewPassword,
                captcha_code: this.state.sureCodeNum,
            }),
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            if (data.status == "0") {
                this.setState(prevState => {
                    return {
                        alertMsg: data.message
                    }
                }, () => {
                    this.alertWindow()
                    console.log(this.state.alertMsg);
                })
            }
            if (data.status == "1") {
                this.setState(prevState => {
                    return {
                        alertMsg: data.success
                    }
                }, () => {
                    this.alertWindow()
                    console.log(this.state.alertMsg);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

//警告弹框
    alertWindow() {
        this.setState(prevState => {
            return {
                showAlertWindow: !prevState.showAlertWindow
            }
        })

        // if(this.state.alertMsg){
        //     this.setState(prevState => {
        //         return {
        //             showAlertWindow: !prevState.showAlertWindow
        //         }
        //     })
        // }
    }

    componentWillMount() {
//获取从account页面传来的用户名数据
        this.setState(prevState => {
            return {
                username: JSON.parse(this.props.match.params.username)
            }
        }, () => {
            // console.log(this.state.username);
        })
//请求验证码
        this.getSureCode()
    }

    render() {
        return <div className="changepassword">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">修改密码</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*第一部分*/}
            <ul className="changepassword-part1">
                <li>
                    <input type="text" placeholder="账号" onChange={this.accNum.bind(this)}/>
                </li>
                <li>
                    <input type="text" placeholder="旧密码" onChange={this.oddpass.bind(this)}/>
                </li>
                <li>
                    <input type="text" placeholder="请输入新密码" onChange={this.newpass.bind(this)}/>
                </li>
                <li>
                    <input type="text" placeholder="请确认新密码" onChange={this.sureNewPass.bind(this)}/>
                </li>
                <li>
                    <input type="text" placeholder="验证码" onChange={this.sureNum.bind(this)}/>
                    <div>
                        <img src={this.state.sureCode} alt=""/>
                        <div onClick={this.getSureCode.bind(this)}><p>看不清</p><p>换一张</p></div>
                    </div>
                </li>
            </ul>
            {/*第二部分*/}
            <div className="changepassword-part2"><p onClick={this.changePassword.bind(this)}>确认修改</p></div>
            {/*弹窗*/}
            <div className="login-part5-a" style={{display: this.state.showAlertWindow ? "flex" : "none"}}>
                <div className="login-part5 box animated heartBeat">
                    <img src={require("../img/gantanhao.png")} alt=""/>
                    <p>{this.state.alertMsg}</p>
                    <p onClick={this.alertWindow.bind(this)}>确认</p>
                </div>
            </div>
        </div>
    }
}

export default ChangePassword;
