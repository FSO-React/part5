import PropTypes from 'prop-types'

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

Notification.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification