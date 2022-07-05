/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { db  } from 'firebase/firebaseInit';
import firebase from 'firebase/app'
// 로컬스토리지 아이템 가져오기
const localitems = localStorage.getItem('loginCartItems') !== null ? JSON.parse(localStorage.getItem('loginCartItems')) : []

const firebaseUpdate= () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      const cart = localStorage.getItem('loginCartItems') !== null ? JSON.parse(localStorage.getItem('loginCartItems')) : []

      db.collection('user').doc(`${user.uid}`).set({cart}).then(()=>
      console.log("파이어베이스에 상품이 업데이트되었습니다.")
      ).catch((error)=>{
        console.error("Error writing document: ", error);
      });
    } else {
      console.log('로그인유저가 없어 파이어베이스에 업데이트 되지 않았습니다.')
    }
  })
}


interface Item {
  id:number;
  name:string;
  color:string;
  price:number;
  quantity:number;
}

const initialState = {
  items:localitems
};

const UsercartItemsSlice = createSlice({
  name: 'userCartItem',
  initialState,
  reducers: {
    userAddItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.items.filter(
        (e: Item) => e.name === newItem.name && e.color === newItem.color);

      if (duplicate.length > 0) {
        state.items = state.items.filter(
          (e:Item) => e.name !== newItem.name || e.color !== newItem.color);
          state.items = [...state.items, {
            id: duplicate[0].id,
            name: newItem.name,
            image:newItem.image,
            color: newItem.color,
            price: newItem.price,
            quantity: newItem.quantity + duplicate[0].quantity
          }]
      }else {
        state.items = [...state.items, {
            ...action.payload,
            id: state.items.length > 0 ? state.items[state.items.length - 1].id + 1 : 1
        }]
        localStorage.setItem('loginCartItems', JSON.stringify(state.items.sort((a:any, b:any) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
    }
    firebaseUpdate();
    },
    userUpdateItem: (state, action)=>{
      const newItem = action.payload;
      console.log(newItem);
      const item = state.items.filter((e:Item) => e.name === newItem.name && e.color === newItem.color );//동일아이템
      
      if(item.length > 0) {
        state.items = state.items.filter((e:Item)=>e.name !== newItem.name || e.color !== newItem.color)//다른아이템
        state.items = [...state.items, {
          id:item[0].id,
          name: newItem.name,
          color:newItem.color,
          price: newItem.price,
          image:newItem.image,
          quantity: newItem.quantity
        }]
        state.items = state.items.sort((a:Item, b:Item) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))
      }
      firebaseUpdate();
      localStorage.setItem('loginCartItems', JSON.stringify(state.items))
    },
    UserRemoveItem: (state, action) => {
      const item = action.payload
      state.items = state.items.filter((e:Item) => e.name !== item.name || e.color !== item.color )
      
      firebaseUpdate();
      localStorage.setItem('loginCartItems', JSON.stringify(state.items.sort((a:Item, b:Item) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0))))
      
    },
},
  
});

export const { userAddItem, userUpdateItem ,UserRemoveItem} = UsercartItemsSlice.actions;
export default UsercartItemsSlice.reducer;
