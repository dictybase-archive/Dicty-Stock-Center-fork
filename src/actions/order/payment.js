import { routeActions } from 'react-router-redux'
import { createUser, getUser, updateUser } from 'utils/api'
import { status, json } from 'utils/fetch'
import types from 'constants'

const { ADD_PAYMENT, SAME_AS_SHIPPING } = types

const addPayment = (user, payment) => {
    // retrieve user info from json api structure and
    // store in the state of the app
    const {
        type, id,
        attributes: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            organization: org,
            group: group,
            address: {
                first: address, second: address2
            },
            city: city,
            state: state,
            zip: zip,
            country: country,
            phone: phone
        }
    } = user.data

    const payer = {
        type, id, firstName, lastName, email, org, group, address,
        address2, city, state, zip, country, phone
    }
    return {
        type: ADD_PAYMENT,
        initialized: true,
        payer,
        payment
    }
}

const sameAsShipping = payment => {
    return {
        type: SAME_AS_SHIPPING,
        payment
    }
}

let server = SERVER
if (process.env.SERVER) {
    server = process.env.SERVER
}

export const submitForm = (values, dispatch) => {
    let payment = {
        method: values.payMethod,
        poNum: values.poNum
    }
    return new Promise((resolve, reject) => {
        // if payer address is NOT the same as shipping address
        // then call the server to validate the user
        if (!values.sameAsShipping) {
            getUser(server, values.email)
            .then(response => {
                if (response.status === 200) {
                    return Promise.resolve(true)
                } else if (response.status === 404) {
                    return Promise.resolve(false)
                }
                return Promise.reject(new Error('Error'))
            })
            .then(userExists => {
                if (userExists) {
                    updateUser(server, values)
                    .then(status)
                    .then(json)
                    .then(user => {
                        resolve()
                        dispatch(addPayment(user, payment))
                        dispatch(routeActions.push('/order/submit'))
                    })
                    .catch(error => {
                        reject({_error: 'User cannot be updated', error})
                    })
                } else {
                    createUser(server, values)
                    .then(status)
                    .then(json)
                    .then(user => {
                        resolve()
                        dispatch(addPayment(user, payment))
                        dispatch(routeActions.push('/order/submit'))
                    })
                    .catch(error => {
                        reject({_error: 'User cannot be created', error})
                    })
                }
            })
            .catch(error => {
                reject({_error: 'Fetching user error!', error})
            })
        } else {
            // payer address is the same as shipping address.(consumer = payer)
            // no need to call the sever again
            resolve()
            dispatch(sameAsShipping(payment))
            dispatch(routeActions.push('/order/submit'))
        }
    })
}

// direct user to edit payment information
export const editPayment = () => {
    return dispatch => {
        dispatch(routeActions.push('/order/payment/edit'))
    }
}
