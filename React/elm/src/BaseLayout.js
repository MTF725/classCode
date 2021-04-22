import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import "./BaseLayout.css"
import Header from "./Header";
import Cities from "./Cities";
import Searchcity from "./Searchcity";
import Allstore from "./Allstore";
import Store from "./Store";
import Storekind from "./Storekind";
import Mine from "./Mine";
import Account from "./Account";
import NewAddress from "./NewAddress";
import Login from "./Login";
import ChangePassword from "./ChangePassword";
import AddToAddress from "./AddToAddress";
import OrderRemake from "./OrderRemake";
import OrderSure from "./OrderSure";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getMsgFormCities: "0r000"
        }
    }

    render() {
        return (
            <div className="app">
                <header>
                    {/*<Header/>*/}
                </header>
                <section>
                    <Route path="/" exact component={Cities}/>
                    <Route path="/searchcity/:id" component={Searchcity}/>
                    <Route path="/allstore/:city" component={Allstore}/>
                    <Route path="/store/:store" component={Store}/>
                    <Route path="/storekind" component={Storekind}/>
                    <Route path="/mine" component={Mine}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/newaddress" component={NewAddress}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/changepassword/:username" component={ChangePassword}/>
                    <Route path="/addtoaddress" component={AddToAddress}/>
                    <Route path="/orderremake" component={OrderRemake}/>
                    <Route path="/ordersure/:addressmsg" component={OrderSure}/>
                </section>
            </div>
        )
    }
}

export default withRouter(App);
