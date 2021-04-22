/*react在读取到reducers文件夹的时候，会先读取这个文件夹下的index文件，我们在这个文件里将product-reducer和user-reducer合并

在终端 cd src/redux/reducers

使用 npm init 指令创建项目描述文件 package.json。
*/

import ProductReducer from './product-reducer';
import UserReducer from './user-reducer';
//引入redux的combineReducers函数
import {combineReducers} from 'redux';

const allReducers={
    ProductReducer,UserReducer
}
//combineReducers函数接受另一个函数作为参数,并返新的Reducer(合并之后的Reducer)
const rootReducers=combineReducers(allReducers);
export default rootReducers;