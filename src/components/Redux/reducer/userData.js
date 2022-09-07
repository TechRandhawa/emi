const initailState = {
  uid: '',
}
const uidNumber = (state = initailState, action) => {
  switch (action.type) {
    case 'USERUID':
      return {
        ...state,
        uid: action.payload,
      }

    default:
      return state
  }
}

export default uidNumber
