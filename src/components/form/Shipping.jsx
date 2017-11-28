import React, { Component } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import ShippingMethod from './ShippingMethod'
import ShippingAdditional from './ShippingAdditional'
import SubmitButton from './SubmitButton'
import { reduxForm } from 'redux-form'
import { submitForm } from 'actions/order/shipping'
import { syncValidateShipping } from 'forms/validate/order-form'
import { Flex, Box } from 'rebass'
import { DictyHeader } from 'styles'

export const fields = [
    'firstName',
    'lastName',
    'email',
    'org',
    'group',
    'address',
    'address2',
    'city',
    'state',
    'zip',
    'country',
    'phone',
    'shipAccount',
    'shipAccountNum',
    'comments'
]

class Shipping extends Component {
    displayName = 'shipping information'

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        submitting: PropTypes.bool
    }

    render() {
        const { handleSubmit, submitting, error } = this.props
        const {
            fields: {
                firstName,
                lastName,
                email,
                org,
                group,
                address,
                address2,
                city,
                state,
                zip,
                country,
                phone,
                shipAccount,
                shipAccountNum,
                comments
            }
        } = this.props
        return (
            <Flex wrap justify="center">
                <Box w={ 2 / 3 }>
                    <DictyHeader>
                        <h2>Please enter shipping information</h2>
                    </DictyHeader>
                </Box>
                <Box w={ 3 / 5 }>
                    <form onSubmit={ handleSubmit } className="form-horizontal">
                        <Flex>
                            <Box w={ 1 / 2 } mr={ 2 }>
                                <User
                                    title={ 'Shipping Address' }
                                    firstName={ firstName }
                                    lastName={ lastName }
                                    email={ email }
                                    org={ org }
                                    group={ group }
                                    address={ address }
                                    address2={ address2 }
                                    city={ city }
                                    state={ state }
                                    zip={ zip }
                                    country={ country }
                                    phone={ phone }
                                />
                            </Box>
                            <Box w={ 1 / 2 }>
                                <Box mb={ 2 }>
                                    <ShippingMethod
                                        title={ 'Shipping Method' }
                                        shipAccount={ shipAccount }
                                        shipAccountNum={ shipAccountNum }
                                    />
                                </Box>
                                <Box mb={ 2 }>
                                    <ShippingAdditional
                                        title={ 'Additional Information' }
                                        comments={ comments }
                                    />
                                </Box>

                                { error && (
                                    <Box mb={ 2 }>
                                        <div className="alert alert-danger">
                                            <i className="fa fa-exclamation-circle" />
                                            <strong> Error! </strong> { error }
                                        </div>
                                    </Box>
                                ) }
                                <Box>
                                    <SubmitButton
                                        name={ 'Continue ' }
                                        submitting={ submitting }
                                        icon={ 'fa fa-arrow-circle-right' }
                                    />
                                </Box>
                            </Box>
                        </Flex>
                    </form>
                </Box>
            </Flex>
        )
    }
}

export default reduxForm({
    form: 'shipping',
    fields,
    onSubmit: submitForm,
    validate: syncValidateShipping
})(Shipping)
