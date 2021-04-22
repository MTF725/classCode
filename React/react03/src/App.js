import React, {Component} from 'react';
import Baselayout from "./BaseLayout";
//BrowserRouter组件，这是react路由的接口实现，所有与路由有关的模块，组件，都需要被该组件包裹才可以实现效果
import {BrowserRouter} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Baselayout/>
        </BrowserRouter>
    )

}


export default App;
