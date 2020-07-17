import React from 'react'
import { connect, useDispatch } from 'react-redux'

  
const Notification = (props) => {
  const dispatch = useDispatch()

  const notification = props.notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notification){
    return (
      <div></div>
    )
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification