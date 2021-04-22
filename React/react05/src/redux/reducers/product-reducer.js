import {ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from "../actions/product-action";

//设置初始默认值
const initialState = {
    products: [
        {
            proName: "猪肉",
            proPrice: 35,
            proCount: 5
        },
        {
            proName: "牛肉",
            proPrice: 25,
            proCount: 3
        },
        {
            proName: "陈云飞",
            proPrice: 100,
            proCount: 4
        }
    ]
}
//纯函数？  一个函数的结果只由其传入的参数决定，不因外界变量改变而改变

export default function (state = initialState, action) {//接收两个参数,当前的state对象和action对象,并返回一个新的state
    //ES6语法，设置函数参数的默认值
    switch (action.type) {
        case "ADD_PRODUCT": {
            return {
                products: [...state.products, action.payload]//a此处用到扩展运算符来向products添加元素
            }
        }
        case DELETE_PRODUCT: {
            return {
                products: state.products.filter((item) => {
                    return item.proName != action.payload.proName;
                })
            }
        }
        case UPDATE_PRODUCT: {
            return {
                products: state.products.map(item => {
                    return item.proName === action.payload.proName ? action.payload : item;
                })
            }
        }
        default: {
            return state;
        }
    }
}