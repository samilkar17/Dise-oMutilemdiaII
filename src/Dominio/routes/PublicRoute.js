import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectUser } from '../../Puertos/feactures/user/userSlice'

export default function PublicRoute({component:Component,...rest}) {
    const user = useSelector(selectUser)
    return (
        <Route
            {...rest}
            render={(props)=>
                user ? <Redirect to="/avatar"/>: <Component {...props}/>
            }
        />
    )
}