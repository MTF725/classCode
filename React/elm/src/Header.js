import React, {Component} from 'react';
import "./Header.css"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            midname:""
        }
    }

    render() {
        return (
            <div className="cities">
              <div className="header">
                  <div className="left">elm.me</div>
                  <div className="mid">{this.props.toHeader}</div>
                  <div className="right"><img src="" alt=""/></div>
              </div>
            </div>
        )
    }
}

export default Header;
;
