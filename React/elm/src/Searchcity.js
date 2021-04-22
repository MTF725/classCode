import React, {Component} from 'react';
import "./Searchcity.css";

class Searchcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citynow: "",
            inputdata: "",
            searchstores: [],
            historytext: true,
            localArr: [],
            show: false
        }

    }

    inputChange(e) {
        this.state.inputdata = e.target.value
        this.setState(prevState => {
            return {
                inputdata: prevState.inputdata
            }
        }, () => {
        })
    }

    //提交按钮点击事件
    submitmsg() {
        fetch(`https://elm.cangdu.org/v1/pois?city_id=${this.state.citynow.id}&keyword=${this.state.inputdata}&type=search`).then((res) => {
            return res.json()
        }).then((data) => {
            this.setState(prevState => {
                return {
                    searchstores: data,
                    historytext: !prevState.historytext
                }
            }, () => {
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    //选择商家点击事件
    chooseStore(name, address, i) {
        let localobj = {name, address};
        //去重
        if (this.state.localArr.length > 0) {
            if (JSON.stringify(this.state.localArr).indexOf(JSON.stringify(localobj)) == -1) {
                this.setState(prevState => {
                    return {
                        localArr: [...JSON.parse(localStorage.getItem("history")), localobj]
                    }
                }, () => {
                    //保存到本地
                    localStorage.history = JSON.stringify(this.state.localArr);
                    console.log(localStorage.getItem("history"))
                })
            }
        } else {
            this.setState(prevState => {
                return {
                    localArr: [...prevState.localArr, localobj]
                }
            }, () => {
                //保存到本地
                localStorage.history = JSON.stringify(this.state.localArr);
                console.log(localStorage.getItem("history"))
            })
        }
        //跳转到商家页面
        let a = JSON.stringify(this.state.citynow)
        this.props.history.push("/allstore/" + a)
    }

    //清空搜索历史
    deletehistory(e) {
        //清除所有本地记录
        localStorage.removeItem("history");
        this.state.localArr = [];
        this.setState({
            localArr: this.state.localArr,
            show: false
        });

    }

    componentWillMount() {
        this.state.citynow = this.props.match.params.id
        this.state.citynow = JSON.parse(this.state.citynow)
        this.setState((prevState => {
                return {
                    citynow: prevState.citynow
                }
            }, () => {

            })
        )
        //本地存储的数据赋给localArr
        if (localStorage.getItem("history")) {
            this.setState({
                localArr: JSON.parse(localStorage.getItem("history")),
                show: true
            })
        }
    }

    render() {
        return <div className="searchcity">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">{this.state.citynow.name}</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            <div className="searchcity-part1">
                <input type="text" placeholder="输入学校、商务楼、地址" onInput={this.inputChange.bind(this)}/>
                <p onClick={this.submitmsg.bind(this)}>提交</p>
            </div>
            <div className=" searchcity-part2">
                <div className="searchhistory"
                     style={{display: (this.state.historytext == true) ? "block" : "none"}}>搜索历史
                </div>
                {/*历史搜索列表*/}
                <ul style={{display: (this.state.show) ? "block" : "none"}}>
                    {this.state.localArr.map((v, i) => {
                            return <li key={i} className="searchstores"
                                       onClick={this.chooseStore.bind(this, v.name, v.address, i)}>
                                <p className="storename">{v.name}</p>
                                <p className="storeaddress">{v.address}</p>
                            </li>
                        }
                    )}
                    <div className="deletehistory" onClick={this.deletehistory.bind(this)}>清空所有</div>
                </ul>
                {/*搜索列表*/}
                <ul>
                    {this.state.searchstores.map((v, i) => {
                            return <li key={i} className="searchstores"
                                       onClick={this.chooseStore.bind(this, v.name, v.address, i)}>
                                <p className="storename">{v.name}</p>
                                <p className="storeaddress">{v.address}</p>
                            </li>
                        }
                    )}
                </ul>
            </div>
        </div>


    }
}

export default Searchcity;
