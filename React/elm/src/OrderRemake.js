import React, {Component} from 'react';
import "./OrderRemake.css"
import $ from "jquery/dist/jquery"

class OrderRemake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remarks: {},
            bgc: false,
            bgcNum1: "",
            bgcNum2: "",
            textarea: ""
        }
    }

//获取多行文本框数据
    getTextarea(e) {
        let a = e.target.value
        this.setState(prevState => {
            return {
                textarea: a,
                bgc: true,
                quick: []
            }
        })
    }

//跳转并把备注信息传给确认订单页面
    toOrderSure() {
        //获取备注信息
        let doms = this.refs.quickremark;
        let spans = $(doms).children("p").children("span")
        console.log(typeof $(spans[3]).attr("style"));
        let spansmsg = [];
        for (let i = 0; i < spans.length; i++) {
            if (typeof $(spans[i]).attr("style") == "string") {
                spansmsg.push($(spans[i]).html())
            }
        }
        spansmsg.push(this.state.textarea)
        let spansmsg2 =JSON.stringify(["fromOrderRemake",spansmsg])
            //发送并跳转
            this.props.history.push("/ordersure/" + spansmsg2)
    }

//更改备注背景色
    changeBgC1(e) {
        // console.log(e.target.parentNode.childNodes)
        let dom = e.target.parentNode.childNodes
        let a = e.target
        if (dom.length === 1) {
            if (a.style.backgroundColor == "") {
                a.style.backgroundColor = "rgb(49, 144, 232)"
                return
            }
            if (a.style.backgroundColor == "rgb(49, 144, 232)") {
                a.style.backgroundColor = ""
                return
            }
        }
        if (dom.length > 1) {
            let x = 0;
            for (let b = 0; b < dom.length; b++) {
                if (dom[b].style.backgroundColor == "") {
                    x++
                }
            }
            if (x == 3) {
                a.style.backgroundColor = "#3190e8"
            }
            if (0 < x < 3) {
                for (let c = 0; c < dom.length; c++) {
                    dom[c].style.backgroundColor = ""
                    a.style.backgroundColor = "#3190e8"
                }
            }
        }
    }

    componentWillMount() {
        fetch("https://elm.cangdu.org/v1/carts/1/remarks").then(res => {
            return res.json()
        }).then(data => {
            this.setState(prevState => {
                return {
                    remarks: data
                }
            }, () => {
                // console.log(this.state.remarks);
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <div className="OrderRemake">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">订单备注</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*第一部分*/}
            <div className="orderremake-part1">
                <p>快速备注</p>
                <div ref="quickremark">
                    {
                        Object.keys(this.state.remarks).length == 0 ? null : this.state.remarks.remarks.map((v, i) => {
                            return <p key={i}>
                                {
                                    v.map((v1, i1) => {
                                        return <span
                                            key={i1}
                                            onClick={this.changeBgC1.bind(this)}
                                        >{v1}</span>
                                    })
                                }
                            </p>
                        })
                    }
                </div>
            </div>
            {/*第二部分*/}
            <div className="orderremake-part2">
                <p>其他备注</p>
                <textarea placeholder="请输入备注内容（可不填）" onChange={this.getTextarea.bind(this)}></textarea>
            </div>
            {/*第三部分*/}
            <div className="orderremake-part3"><p onClick={this.toOrderSure.bind(this)}>确定</p></div>
        </div>
    }
}

export default OrderRemake;
