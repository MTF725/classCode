import React, {Component} from 'react';
import "./Allstore.css"
import Swiper from 'swiper';
import "../node_modules/swiper/css/swiper.css";
import { DatePicker, message } from 'antd';

//http://elm.cangdu.org/shopping/restaurants?latitude=34.44853&longitude=113.05147&offset=0&limit=20  商铺信息
//http://elm.cangdu.org/v2/index_entry?geohash=34.44853,113.05147&group_type=1   分类
//https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg

class Allstore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerArr: [],
            cityMsg:[],
            storeMsg:[],
        }
    }
//跳转到分类页面
    toStorekind(){
        this.props.history.push("/storekind")
    }
//跳转到商铺页面并传值
    toStore(v,i){
        let a = JSON.stringify({latitude:this.state.storeMsg[i].latitude,longitude :this.state.storeMsg[i].longitude,id:this.state.storeMsg[i].id})
       this.props.history.push("/store/"+a)
    }
    componentWillMount() {
        this.setState(prevState => {
            return{
                cityMsg: JSON.parse(this.props.match.params.city)
            }
        },()=>{
        })
        //请求分类数据
        fetch(`https://elm.cangdu.org/v2/index_entry`).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            for (let a = 0; a < data.length / 8; a++) {
                let arr = data.slice(a * 8, (a + 1) * 8)
                this.setState(prevState => {
                    return {
                        bannerArr: [...prevState.bannerArr, arr]
                    }
                }, () => {
                    var mySwiper = new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }
        }).catch(err => {
            console.log(err);
        })
        //请求商铺数据
        fetch(`https://elm.cangdu.org/shopping/restaurants?latitude=${this.state.cityMsg.latitude  }&longitude=${this.state.cityMsg.longitude}`).then(res=>{
         return res.json()
        }).then(data=>{
          this.setState(prevState => {
              return{
                  storeMsg:data
              }
          },()=>{
              console.log(this.state.storeMsg)
          })
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return <div className="allstore">
            {/*头部*/}
            <div className="header">
                <div className="left">elm.me</div>
                <div className="mid">{this.state.cityMsg.name}</div>
                <div className="right"><img src="" alt=""/></div>
            </div>
            {/*空*/}
            <div className="header-empty"></div>
            {/*轮播图*/}
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.state.bannerArr.map((v, i) => {
                            return <ul className="swiper-slide" key={i}>
                                {
                                    v.map((v1, i1) => {
                                        return <li onClick={this.toStorekind.bind(this)}>
                                            <img src={'https://fuss10.elemecdn.com' + v1.image_url} alt=""/>
                                            <p>{v1.title}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>

            </div>
            {/*所有商家*/}
            <div className="allstore-stores">
            <div className="title">
                <img src={require("../img/store.png")} alt=""/>
                <span>附近商家</span>
            </div>
            <ul>
                {this.state.storeMsg.map((v,i)=>{
                    return <li key={i} onClick={this.toStore.bind(this,v,i)}>{
                        <div className="store-msg">
                            <img src={"http://elm.cangdu.org/img/"+v.image_path} alt=""/>
                            <div className="store-des">
                                <div className="store-line1">
                                    <p>品牌</p> <p>{v.name}</p> <p>保准票</p>
                                </div>
                                <div className="store-line2">
                                    <p></p><p>月售{v.recent_order_num}单</p> <p>{v.delivery_mode.text}</p><p>准时达</p>
                                </div>
                                <div className="store-line3">
                                    <p>￥{v.float_minimum_order_amount}起送/配送费约￥{v.float_delivery_fee}</p><p>{v.distance}/<span>{v.order_lead_time}</span></p>
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

export default Allstore;
