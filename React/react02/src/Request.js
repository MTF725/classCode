import React, {Component} from 'react';
import qs from 'querystring';

class Request extends Component {
    constructor(props) {
        super(props);
        this.getReq = this.getReq.bind(this)
        this.postReq = this.postReq.bind(this)
    }

    /*
       fetch
     */
    getReq() {
        //fetch发起请求之后，需要对得到的相应的对象调用json方法才能得到返回的数据
        fetch("/api/get?username=abc&password=123", {method: "get"}).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    postReq() {
        /*
          fetch  在发起post请求时，需要注意：
            1.headers字段：如何设置header要考虑后台，保证前后台通信的数据格式保持一致，json或者参数字符串
            2.body字段：如果规定数据格式为json，body字段直接用JSON.stringify;如果规定数据格式是参数字符串,body字段需要写成参数字符串格式,建议用querystring模块帮助转化
         */
        fetch("/api/post", {
            method: "post",
            //如果后台用参数字符串解析，则此处body和headers用以下写法
            body: qs.stringify({id: 123, name: "张三"}, "&", "="),
            headers: {'Content-Type': ' application/x-www-form-urlencoded'}

            //如果后台用json串解析，则此处body和headers用以下写法：
            // body:JSON.stringify({id:123,name:"张三"}),
            // headers:{'Content-Type':'application/json'}//
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return <fieldset>
            <legend>网络请求组件</legend>
            <button onClick={this.getReq}>get请求</button>
            <button onClick={this.postReq}>post请求</button>
        </fieldset>
    }
}

export default Request;
