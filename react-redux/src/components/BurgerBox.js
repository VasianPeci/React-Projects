import React from "react";
import { orderBurger } from './redux';
import { connect } from 'react-redux';

function BurgerBox(props) {
    return (
        <div className="container">
            <h2 className="text">Number of Burgers Available - {props.burgerBuns}</h2>
            <button className="btn" onClick={props.orderBurger}>Order Burger</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        burgerBuns: state.burger.burgerBuns
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        orderBurger: () => dispatch(orderBurger()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBox);