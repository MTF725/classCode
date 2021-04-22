import React, {Component} from 'react';
import "./Cities.css"
//http://elm.cangdu.org/v1/cities?type=hot  热门地址
//http://elm.cangdu.org/v1/cities?type=group   所有分类
//http://elm.cangdu.org/v1/cities?type=guess  定位
class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citynow: "",
            hotcities: [],
            hotcitiesid: [],
            hot: [],
            allcitieskeys: [],
            allcities: [],
            newallcities: [],
            obj: {}
        }
    }

    toSeachCity2(i) {
        let a=JSON.stringify(this.state.hot[i])
        this.props.history.push("/searchcity/" + a);
    }

    toSeachCity3(v, i) {
        let a=JSON.stringify(this.state.obj[v][i])
        this.props.history.push("/searchcity/" + a);

    }

    getDingWei() {
        //fetch发起请求之后，需要对得到的相应的对象调用json方法才能得到返回的数据
        fetch("http://elm.cangdu.org/v1/cities?type=guess").then((res) => {
            return res.json();
        }).then((data) => {
            this.setState((prrviousState) => {
                return {
                    citynow: prrviousState.citynow + data.name,
                }
            }, () => {
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    getReMen() {
        fetch("http://elm.cangdu.org/v1/cities?type=hot ").then((res) => {
            return res.json();
        }).then((data) => {
            this.setState(prevState => {
               return{
                   hot:data
               }
            },()=>{
            })
            console.log(data)
            for (let v in data) {
                this.state.hotcities.push(data[v].name);
                this.state.hotcitiesid.push(data[v].id);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    getAll() {
        fetch("http://elm.cangdu.org/v1/cities?type=group ").then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                allcitieskeys: Object.keys(data).sort(),
            }, () => {
                let tempObj = {};
                for (let a = 0; a < this.state.allcitieskeys.length; a++) {
                    tempObj[this.state.allcitieskeys[a]] = data[this.state.allcitieskeys[a]]
                }
                this.setState(() => {
                    return {
                        obj: tempObj
                    }
                })
            });
        }).catch((err) => {
            console.log(err)
        })
    }

    componentWillMount() {
        this.getDingWei();
        this.getReMen();
        this.getAll();
    }

    render() {
        return (
            <div className="cities">
                {/*头部*/}
                <div className="header">
                    <div className="left">elm.me</div>
                    <div className="mid">{this.state.citynow}</div>
                    <div className="right"><img src="" alt=""/></div>
                </div>
                {/*空*/}
                <div className="header-empty"></div>
                {/*定位城市*/}
                <div className="part1">
                    <div className="line1">
                        <span className="line1-left">当前定位城市：</span><span className="line1-right">定位不准时，请在城市列表中选择</span>
                    </div>
                    <div className="line2">
                        <span onClick={this.toSeachCity}>{this.state.citynow}</span><span></span>
                    </div>
                </div>
                {/*热门城市*/}
                <div className="part2">
                    <div className="part2-line1">热门城市</div>
                    <div className="part2-line2">
                        {
                            this.state.hotcities.map((v, i) => {
                                return <span key={i} className="hots" onClick={() => {
                                    this.toSeachCity2(i)
                                }}>{v}</span>
                            })}
                    </div>
                </div>
                {/*全部城市*/}
                <ul className="part3">
                    {
                        Object.keys(this.state.obj).map((v, i) => {
                            return <li key={i}>
                                <div><p>{v}</p><p>{v == "A" ? "按字母排序" : ""}</p></div>
                                {
                                    this.state.obj[v].map((v1, i1) => {
                                        return <span key={i1}
                                                     onClick={this.toSeachCity3.bind(this, v, i1)}>{v1.name}</span>
                                    })
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Cities;
