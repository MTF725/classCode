import React, {Component} from 'react';
import "./Home.css"
import Swiper from 'swiper';
import '../node_modules/swiper/css/swiper.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerArr: []
        }
    }

    componentWillMount() {
        fetch("https://elm.cangdu.org/v2/index_entry", {method: "get"}).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            for (let i = 0; i < data.length / 8; i++) {
                let subArr = data.slice(i * 8, (i + 1) * 8);
                this.setState(previousState => {
                    return {
                        bannerArr: [...previousState.bannerArr, subArr]
                    }
                }, () => {
                    var mySwiper = new Swiper('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项

                        // // 如果需要分页器
                        // pagination: {
                        //     el: '.swiper-pagination',
                        // },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        // scrollbar: {
                        //     el: '.swiper-scrollbar',
                        // },
                    })
                });
                console.log(this.state.bannerArr);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {

    }

    render() {
        return <div className="home">
            <p>这是home组件</p>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        this.state.bannerArr.map((v, i) => {
                            return <div className="swiper-slide" key={i}>
                                {
                                    v.map((v1, i1) => {
                                        return <img src={'https://fuss10.elemecdn.com' + v1.image_url}
                                                    style={{width: '150px', height: '150px', float: 'left'}} key={i1}/>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>


        </div>
    }
}

export default Home;
