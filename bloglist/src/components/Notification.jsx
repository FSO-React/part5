const Notification = ({ status, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${status} notification`}>
      {message}
    </div>
  )
}

export default Notification;