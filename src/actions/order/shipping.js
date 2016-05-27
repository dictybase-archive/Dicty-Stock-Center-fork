import { routeActions } from 'react-router-redux'
import { createUser, getUser, updateUser } from 'utils/api'
import { status, json } from 'utils/fetch'
import types from 'constants'

const { ADD_SHIPPING } = types

const addShipping = (user, details) => {
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

    const consumer = {
        type, id, firstName, lastName, email, org, group, address,
        address2, city, state, zip, country, phone
    }
    return {
        type: ADD_SHIPPING,
        initialized: true,
        consumer,
        details
    }
}

let server = SERVER
if (process.env.SERVER) {
    server = process.env.SERVER
}

export const submitForm = (values, dispatch) => {
    let details = {
        shipAccount: values.shipAccount,
        shipAccountNum: values.shipAccountNum,
        comments: values.comments
    }
    return new Promise((resolve, reject) => {
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
                    dispatch(addShipping(user, details))
                    dispatch(routeActions.push('/order/payment'))
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
                    dispatch(addShipping(user, details))
                    dispatch(routeActions.push('/order/payment'))
                })
                .catch(error => {
                    reject({_error: 'User cannot be created', error})
                })
            }
        })
        .catch(error => {
            reject({_error: 'Fetching user error!', error})
        })
    })
}

// direct user to edit shipping information
export const editShipping = () => {
    return dispatch => {
        dispatch(routeActions.push('/order/shipping/edit'))
    }
}