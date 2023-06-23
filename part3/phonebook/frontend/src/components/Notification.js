function Notification({ code, person }) {
  if (code === null)
    return null;

  const success = {
    color: 'green',
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontSize: 16
  }

  const error = {
    color: 'red',
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    fontSize: 16
  }

  if (code === 1) {
    return (
      <div style={success}>
        Added {person}
      </div>
    )
  }

  if (code === 2) {
    return (
      <div style={success}>
        Modified {person}
      </div>
    )
  }

  if (code === 3) {
    return (
      <div style={success}>
        {person} deleted successfully
      </div>
    )
  }

  if (code === 4) {
    return (
      <div style={error}>
        {person}
      </div>
    )
  }

  if (code === 404) {
    return (
      <div style={error}>
        Information of {person} has already been removed from server
      </div>
    )
  }
}

export default Notification