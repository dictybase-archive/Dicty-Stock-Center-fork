import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import 'styles/core.scss'

export default class OrderConfirmation extends Component {
    displayName = 'order confirmation'

    static propTypes = {
        order: PropTypes.object
    }

    render() {
        const { id } = this.props.order
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <div className="alert alert-success">
                            <i className="fa fa-5x fa-check-circle-o"></i>
                            <h3>Thank you, your order has been submitted successfully!</h3>
                            <p>Order Number: <strong>{ id }</strong></p>
                            <p>We have sent you a confirmation email.</p>
                            <p>The <strong>Payer</strong> will receive several emails through the
                                NU Core system to complete the payment.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <Link to="/home"
                            className="btn btn-primary btn-lg btn-block">
                            <i className="fa fa-home"></i> Stock Center Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}