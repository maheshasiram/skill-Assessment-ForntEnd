import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

/**
 * create store to store the reducer states and reuse these state in the application.
 * manage reducer in store and create middleware with thunk. 
 */

 const store = configureStore(
   { reducer: reducer,
    middleware: [thunk]
}
)

export default store;
