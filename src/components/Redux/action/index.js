export const getUserUID = (userUID) => {
  return {
    type: 'USERUID',
    payload: userUID,
  }
}
export const getClientUID = (ClientUID) => {
  return {
    type: 'CLIENTUID',
    payload: ClientUID,
  }
}
