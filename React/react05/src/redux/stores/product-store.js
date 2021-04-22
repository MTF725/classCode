//Redux 提供createStore这个函数，用来生成 Store。
import {createStore} from 'redux'
//引入product-reducer文件中的函数，并命名为myReducer
import myReducer from '../reducers/product-reducer'

//createStore函数接受另一个函数作为参数，返回新生成的 Store 对象
export default createStore(myReducer);
