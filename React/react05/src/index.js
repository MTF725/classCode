import Store from './redux/stores/product-store';
import {addProduct,deleteProduct,updateProduct} from "./redux/actions/product-action";

//subscribe 设置监听，如果store中数据有变化，就自动触发
Store.subscribe(()=>{
    console.log(Store.getState());
});

//修改store中的数据，唯一方法就是要用Store的dispatch,store.dispatch接受一个 Action 对象作为参数，将它发送出去。
Store.dispatch(addProduct("土豆",0.5,100));
Store.dispatch(addProduct("包菜",1,100));
Store.dispatch(deleteProduct("包菜",1,100));
Store.dispatch(updateProduct("土豆",200,1000));

