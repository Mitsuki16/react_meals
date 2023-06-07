import React from "react";

function CartFoodItem(props) {
  const AddHandler = (event) => {
    event.preventDefault();
    const data = {
      name: props.cartItem.name,
      price: props.cartItem.price,
      amount: props.cartItem.amount + 1,
    };
    props.onAddClick(data);
  };

  const DeleteHandler = (event) => {
    event.preventDefault();
    const data = props.cartItem.name;
    props.onDeleteClick(data);
  };

  return (
    <div>
      <div>
        <div className="m-2 flex justify-between text-lg ">
          <div className="pt-2 h-20 my-4 ml-4 grid grid-rows-3 gap-11">
            <h1 className=" font-bold  text-2xl">{props.cartItem.name}</h1>
            <div className=" flex justify-start gap-3 h-6">
              <p className=" text-orange-500 font-bold">
                ${props.cartItem.price}
              </p>
              <p className="w-10 mx-2 pb-7 rounded-lg text-center border-2">
                x {props.cartItem.amount}
              </p>
            </div>
          </div>
          <div className="pt-8 py-4 mr-6 text-xl">
            <button
              onClick={DeleteHandler}
              className=" hover:text-white font-bold rounded-lg outline outline-1 outline-orange-500 hover:bg-orange-400 w-12"
            >
              -
            </button>
            <button
              onClick={AddHandler}
              className=" hover:text-white font-bold rounded-lg outline outline-1 outline-orange-500 hover:bg-orange-400 w-12 ml-4"
            >
              +
            </button>
          </div>
        </div>
        <div className="mx-1 border border-orange-400"></div>
      </div>
    </div>
  );
}

export default CartFoodItem;
