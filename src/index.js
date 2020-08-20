import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import App from './components/App/App';
import axios from 'axios';

// Saga Setup #1 require it in
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';



// Saga Setup #4 create the "main" saga function
//   common names for this are `watcherSaga` and `rootSaga`
function* watcherSaga() {
  yield takeEvery('FETCH_FAVE', getFavorites );
  yield takeEvery( 'SET_SEARCH', searchGifSaga);
  yield takeEvery('FETCH_CATEGORY', getCategories);
  yield takeEvery('PUT_CATEGORY', putCategory);
  // yield takeEvery( 'FETCH_GIF', getGifsSaga );
  yield takeEvery( 'ADD_FAVE', addFaveSaga );
}

function* searchGifSaga(action){
    //us try/catch for errors - replaces promise .then & .catch
    try {
      const response = yield axios.get('/api/search/' + action.payload);
      // in Sagas, replace `dispatch` with `put`
      yield put({ type: 'SET_GIFS', payload: response.data.data });
    } catch (error) {
        console.log('error with plant get request', error);
    }
  }

//Saga to add favorites to database
function* addFaveSaga(action){
  //us try/catch for errors - replaces promise .then & .catch
  try {
    yield axios.post('/api/favorite', {payload: action.payload});
    console.log('Favorite successfully added.')
    // in Sagas, replace `dispatch` with `put`
    // yield put({ type: 'SET_GIFS', payload: response.data });
  } catch (error) {
      console.log('error with favorite POST request', error);
  }
}

function* getCategories(){
  try{
    const response = yield axios.get('/api/category');
    yield put({type:'SET_CATEGORY', payload: response.data});
  }catch (error){
    console.log('problem getting categories from server', error);
  }
}

function* getFavorites(){
  try{
    const response = yield axios.get('/api/favorite');
    yield put({type:'SET_FAVE', payload: response.data});
  }catch (error){
    console.log('problem getting favorites from server', error);
  }//end axios
}//end getFavorites

function* putCategory(action){
  console.log(action.payload.gif_id, action.payload.category_id)
  try{
    const response = yield axios.put('/api/favorite/' + action.payload.gif_id, {category_id: action.payload.category_id} );
    yield put({type:'FETCH_FAVE', payload: response.data});
  }catch (error){
    console.log('problem with put to server', error);
  }//end axios
}//end getFavorites

// function* removePlantSaga(action){
//   try{
//     yield axios.delete( '/api/plant/' + action.payload );
//     yield put({type: 'FETCH_PLANTS'});  // GET all plants from server
//   } catch (error) {
//     console.log('error with plant DELETE request', error);
//   }


const faveList= (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVE':
      return action.payload;
    default:
      return state;
  }
};

const gifList = (state = [], action) => {
  switch (action.type) {
    case 'SET_GIFS':
      return action.payload;
    default:
      return state;
  }
};

const categoryList=(state = [], action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.payload;
    default:
      return state;
  }
};

// Saga Setup #2 - create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    gifList,
    faveList,
    categoryList,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// Saga Setup #5 - Last step is to run the "main" or `watcherSaga`
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('react-root'));
