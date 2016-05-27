import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { submitForm } from 'actions/order/payment'
import EditPanel from './EditPanel'
import User from './User'
import PaymentMethod from './PaymentMethod'
import SubmitButton from './SubmitButton'
import PaymentAlert from './PaymentAlert'
import { syncValidatePayment } from 'forms/validate/order-form'
import 'styles/core.scss'

export const fields = [ 'firstName', 'lastName', 'email', 'org', 'group',
    'address', 'address2', 'city', 'state', 'zip', 'country', 'phone',
    'payMethod', 'poNum' ]

class EditPayment extends Component {
    displayName = 'payment information'

    static propTypes = {
        order: PropTypes.object,
        fields: PropTypes.object.isRequired,
        submitting: PropTypes.bool
    }

    render() {
        const { consumer } = this.props.order
        const { editShipping, sameAsShipping } = this.props.orderActions
        const { submitting, handleSubmit,
            fields: { firstName, lastName, email, org, group, address, address2, city,
                state, zip, country, phone, payMethod, poNum
            }
        } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="page-header">Edit payment information</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <EditPanel user={ consumer } edit={ editShipping } title={ 'Ship to:' } />
                    </div>
                </div>
                <hr />
                <button type="button" className="btn btn-info btn-xs" onClick={ sameAsShipping }>
                    Same as shipping
                </button> Click here if payer address is the same as shipping address
                <div className="row">
                    <form onSubmit={ handleSubmit } className="form-horizontal">
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
                                <div className="col-sm-12">
                                    <PaymentAlert />
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

// pull state into forms initial values
const mapStateToProps = state => {
    const { payer, payment } = state.order
    const { firstName, lastName, email, org, group, address,
        address2, city, zip, country, phone
    } = payer
    const { method, poNum } = payment

    return {
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            org: org,
            group: group,
            address: address,
            address2: address2,
            city: city,
            state: payer.state,
            zip: zip,
            country: country,
            phone: phone,
            payMethod: method,
            poNum: poNum
        }
    }
}

export default reduxForm({
    form: 'editPayment',
    fields,
    onSubmit: submitForm,
    validate: syncValidatePayment
},
mapStateToProps
)(EditPayment)