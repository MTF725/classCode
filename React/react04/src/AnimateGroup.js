import React, {Component} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group"

class AnimateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            chooseItem: NaN,
        }
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this)
    }

    addItem() {
        this.setState((previousState) => {
            return {
                itemList: [...previousState.itemList, "newItem"]
            }
        }, () => {
            console.log(this.state.itemList)
        })
    }

    removeItem() {
        this.setState((previousState) => {
            return {

            }
        }, () => {
            console.log(this.state.itemList)
        })
    }

    render() {
        return <fieldset>
            <legend>React-组动画</legend>
            <button onClick={this.addItem}>点击添加元素</button>
            <TransitionGroup>
                {
                    this.state.itemList.map((v, i) => {
                        return <CSSTransition
                            key={i}
                            classNames="fade"
                            timeout={1000}
                            in={this.state.chooseItem === i ? false : true}
                        >

                            <div>
                                {v}
                                <button onClick={this.removeItem.bind(this,i)}>移除</button>
                            </div>
                        </CSSTransition>
                    })
                }
            </TransitionGroup>
        </fieldset>
    }
}

export default AnimateGroup;
