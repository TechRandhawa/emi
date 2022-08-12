const initailState = 'Invalid!'
const uidNumber = (state = initailState, action) => {
  switch (action.type) {
    case 'USERUID':
      return action.payload

    default:
      return state
  }
}

export default uidNumber