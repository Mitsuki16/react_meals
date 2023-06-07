import "./App.css";
import { useState } from "react";
import FoodItem from "./components/FoodItem";
import cart from "./images/cart.svg";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CartFoodItem from "./components/CartFoodItem";
import background_pizza from "./images/pizza.jpg";

const FOOD_LIST = [
  {
    name: "Sushi",
    desc: "Finest Fish and veggies",
    price: "22.99",
    amount: 0,
  },
  {
    name: "Schnitzel",
    desc: "A german speciality!",
    price: "16.50",
    amount: 0,
  },
  {
    name: "Barbecue Burger",
    desc: "American, raw, meaty",
    price: "12.99",
    amount: 0,
  },
  {
    name: "Green Bowl",
    desc: "Healthy...and green...",
    price: "18.99",
    amount: 0,
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [cartSum, setCartSum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [CartList, setCartList] = useState([]);
  const [foodList, setfoodList] = useState(FOOD_LIST);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const calcSum = () =>{
    let sum = 0;
    for (let i in foodList) {
      sum += Number(foodList[i]["amount"]);
    }
    setCartSum(sum);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    console.log("Total Bill: "+totalPrice.toString())
    setOpen(false);

  }

  const AddItem = (data) => {
    for (let i in foodList) {
      if (foodList[i]["name"] === data["name"]) {
        foodList[i].amount += 1;
        break;
      }
    }
    let cart_item_exists = true;
    for (let i in CartList) {
      if (CartList[i]["name"] === data["name"]) {
        CartList[i]["amount"] += 1;
        cart_item_exists = false;
        break;
      }
    }
    setfoodList(foodList);
    if (cart_item_exists === true) {
      setCartList((prevExpenses) => {
        return [data, ...prevExpenses];
      });
    }
    calcSum()
    calcTotalPrice()
  };

  const DeleteItem = (data) => {
    for (let i in CartList) {
      if (CartList[i].name === data && CartList[i].amount !== 1) {
        CartList[i].amount -= 1;
        break;
      } else if (CartList[i].name === data && CartList[i].amount === 1) {
        CartList.splice(i, 1);
        break;
      }
    }
    setCartList((prevExpenses) => {
      return [...prevExpenses];
    });

    for (let i in foodList) {
      if (foodList[i].name === data) {
        if (foodList[i].amount !== 1) {
          foodList[i].amount -= 1;
          break;
        } else if (foodList[i].amount === 1) {
          foodList[i].amount = 0;
          break;
        }
      }
    }
    calcSum()
    calcTotalPrice()
  };

  const calcTotalPrice = () =>{
    let total = 0
    for(let i in CartList){
      total += CartList[i].amount * CartList[i].price
    }
    setTotalPrice(total)
  }

  const foodItems = foodList.map((foodItem) => (
    <FoodItem
      onAddClick={AddItem}
      key={foodItem.name}
      foodItem={foodItem}
    ></FoodItem>
  ));

  const cartItems = CartList.map((CartItem) => (
    <CartFoodItem
      onAddClick={AddItem}
      onDeleteClick={DeleteItem}
      key={CartItem.name}
      cartItem={CartItem}
    ></CartFoodItem>
  ));
  return (
    <div className=" bg-black h-[80pc]">
      <div className="bg-red-700 p-5">
        <div className="flex justify-around">
          <div className="grid content-around">
            <h1 className="text-white font-bold text-4xl">Sandy Meals</h1>
          </div>
          <button
            onClick={handleClickOpen}
            className=" text-white p-4 flex justify-around bg-red-900 w-52 rounded-3xl"
          >
            <img className="w-6" src={cart} alt="Cart Icon"></img>
            <h2>Your Cart</h2>
            <div className="flex justify-center w-8 rounded-3xl bg-red-600">
              <h3>{cartSum}</h3>
            </div>
          </button>
        </div>
      </div>
      <div >
        <div style={{ 
      backgroundImage: `url("${background_pizza}")` 
    }} className=" flex justify-center p-10">
          <div className=" p-2 mt-24 rounded-xl text-center h-64 w-4/12 bg-black grid grid-rows-3 text-white">
            <h1 className="mt-2 text-3xl font-bold">
              Delicious Food, Delivered To You
            </h1>
            <h2>
              Choose your favourite meal from our broad selection of available
              merals and enjoy a delicious lunch or dinner at home.
            </h2>
            <h2>
              All our meals are cooked with high-quality ingredients,
              just-in-time and of couse by experienced chefs!
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <div className="rounded-lg bg-white w-5/12 ">{foodItems}</div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="w-[30pc] bg-white rounded-lg">
            {cartItems}
            <div className="flex justify-between font-extrabold text-2xl p-3">
              <h1>Total Amount</h1>
              <h1>{totalPrice.toFixed(2)}</h1>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex justify-end py-2 text-lg px-2">
            <button
              onClick={handleClose}
              className=" hover:bg-orange-600 hover:text-white outline outline-1 px-5 my-3 outline-orange-600 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="hover:text-black text-white ml-4 bg-orange-600 px-5 my-3 rounded-xl"
            >
              Order
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
