const initailState = {
  uid: '',
  cuid: '',
}
const uidNumber = (state = initailState, action) => {
  switch (action.type) {
    case 'USERUID':
      return {
        ...state,
        uid: action.payload,
      }
    case 'CLIENTUID':
      return {
        ...state,
        cuid: action.payload,
      }

    default:
      return state
  }
}

export default uidNumber
