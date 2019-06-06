// Defining state as null because the initial state should not be undefined.
export default (state = null, action) => {
  switch (action.type) {
    case 'select_library':
      // console.log('action return==>', action.payload)
      return action.payload;
    default:
      return state;
  }
}