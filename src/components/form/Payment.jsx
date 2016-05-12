import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Consumer from './Consumer'
import User from './User'
import PaymentMethod from './PaymentMethod'
import SubmitButton from './SubmitButton'
import 'styles/core.scss'

export const fields = [ 'firstName', 'lastName', 'email', 'org', 'group',
    'address', 'address2', 'city', 'state', 'zip', 'country', 'phone',
    'payMethod', 'poNum' ]

class Payment extends Component {
    displayName = 'payment information'

    static propTypes = {
        order: PropTypes.object,
        fields: PropTypes.object.isRequired,
        submitting: PropTypes.bool
    }

    render() {
        const { consumer } = this.props.order
        const { editShipping } = this.props.orderActions
        const { submitting,
            fields: { firstName, lastName, email, org, group, address, address2, city,
                state, zip, country, phone, payMethod, poNum
            }
        } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="page-header">Please enter payment information</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Consumer consumer={ consumer } edit={ editShipping } />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <form onSubmit={ '' } className="form-horizontal">
                        <div className="col-md-6">
                            <User title = { 'Payer Address' }
                                firstName = { firstName }
                                lastName = { lastName }
                                email = { email }
                                org ={ org }
                                group = { group }
                                address = { address }
                                address2 = { address2 }
                                city = { city }
                                state = { state }
                                zip = { zip }
                                country = { country }
                                phone = { phone }
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-xs-12">
                                    <PaymentMethod title={ 'Payment Method' }
                                        payMethod={ payMethod }
                                        poNum={ poNum }
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-offset-4 col-md-8 text-center">
                                    <SubmitButton name={ 'Continue ' }
                                        submitting={ submitting }
                                        icon = { 'fa fa-arrow-circle-right' }
                                    />
                                    <small className="text-info">
                                        You can review this order before it's final.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'payment',
    fields
})(Payment)

