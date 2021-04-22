import React, {Component} from 'react';
import "./Login.css"
import "animate.css/animate.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sureCode: "",
            accountNums: "",
            passwordNums: "",
            surecodeNums: "",
            alertMsg: "",
            showAlertWindow: false,
            showPasswordNum: false,
        }
    }

//获取账号输入框内的值
    accountNum(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                accountNums: a
            }
        }, () => {
            // console.log(this.state.accountNums)
        })
    }

//获取密码输入框内的值
    passwordNum(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                passwordNums: a
            }
        }, () => {
            // console.log(this.state.passwordNums)
        })
    }

//获取验证码输入框内的值
    sureNum(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                surecodeNums: a
            }
        }, () => {
            // console.log(this.state.surecodeNums)
        })
    }

//密码是否显示
    showPassword() {
        this.setState(prevState => {
            return {
                showPasswordNum: !prevState.showPasswordNum
            }
        })
    }

//警告弹框
    alertWindow() {
        this.setState(prevState => {
            return {
                showAlertWindow: !prevState.showAlertWindow
            }
        })
    }

//登录
    login() {
        fetch("https://elm.cangdu.org/v2/login",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.accountNums,
                    password: this.state.passwordNums,
                    captcha_code: this.state.surecodeNums,
                }),
                credentials: 'include'
            },
        ).then(res => {
            return res.json()
        }).then(data => {
            if(data.__v=="0"){
                this.props.history.push("./mine")
            }
            if (data.status == "0") {
                this.setState(prevState => {
                    return {
                        alertMsg: data.message
                    }
                }, () => {
                    console.log(this.state.alertMsg);
                })
                this.alertWindow();
                this.getSureCode()
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }
//跳转到更改密码压面
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

    componentWillMount() {
        this.getSureCode()
    }

    render() {
        return <div className="login">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">账户信息</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            <ul className="login-part1">
                <li><input type="text" placeholder="账号" onChange={this.accountNum.bind(this)}/></li>
                <li>
                    <input type={this.state.showPasswordNum?"text":"password"} placeholder="密码" onChange={this.passwordNum.bind(this)}/>
                    <div>
                        <p onClick={this.showPassword.bind(this)} style={this.state.showPasswordNum?{background:"red",left:"1rem",transition:".4s linear"}:null}></p>
                        <p></p>
                    </div>
                </li>
                <li>
                    <input type="text" placeholder="验证码" onChange={this.sureNum.bind(this)}/>
                    <div className="login-part1-li3">
                        <div><img src={this.state.sureCode} alt=""/></div>
                        <div onClick={this.getSureCode.bind(this)}>
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="login-part2">
                <p>温馨提示：未注册过的账号，登录时将自动注册</p>
                <p>注册过的用户可凭账号密码登录</p>
            </div>
            <div className="login-part3">
                <p onClick={this.login.bind(this)}>登录</p>
            </div>
            <div className="login-part4">重置密码?</div>
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

export default Login;
