import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    let notificationType;
    if (!notification[0]){
        return (
            <div></div>
        )
    }

    if (!notification[1]){
      notificationType = "notification"
    }
    else{
      notificationType = notification[1]
    }

    const message = notification[0]
    if (notificationType === 'error'){
     return (
        <div className="error">
            {message}
        </div>
      )
    }
    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default {Notification}
