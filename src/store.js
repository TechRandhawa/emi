import { createStore } from 'redux'
import rootReducer from './components/Redux/reducer/index'

const store = createStore(
  rootReducer,
)

export default store