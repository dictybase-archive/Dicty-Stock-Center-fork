import { Route } from 'react-router'
import React from 'react'
import App from 'containers/App'
import Login from 'components/Login'
import OauthCallback from 'components/OauthCallback'
import AuthLoader from 'components/AuthLoader'

export default (
    <Route path="/" component={ App }>
        <Route path="login" component={ Login } />
        <Route path="logout" component={ Login } />
        <Route path=":provider/callback" component={ OauthCallback } />
        <Route path="load/auth" component={ AuthLoader } />
    </Route>
)

