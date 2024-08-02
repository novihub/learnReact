import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'

type MapStateToPropsType = {
  isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
})

// Constrain T to include React.JSX.IntrinsicAttributes
export function withAuthRedirect<T extends React.ComponentType<any>>(Component: T) {
  // Define type for props from redux
  type PropsFromRedux = ConnectedProps<typeof connector>

  class RedirectComponent extends React.Component<PropsFromRedux> {
    render() {
      if (!this.props.isAuth) return <Navigate to='/login' />
      
      return <Component {...this.props as T extends React.ComponentType<infer P> ? P : never} />
    }
  }

  const connector = connect(mapStateToPropsForRedirect)
  
  return connector(RedirectComponent)
}
