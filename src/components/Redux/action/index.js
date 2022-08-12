export const getUserUID = (userUID) => {
    return {
      type: 'USERUID',
      payload: userUID
    }
  }
  export const decNumber = () => {
    return {
      type: 'DECREMENT',
    }
  }