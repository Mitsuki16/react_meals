import React from "react";

function FoodItem(props) {

  const submitHandler = (event)=>
  {
    event.preventDefault();
    const data = {
      name: props.foodItem.name,
      price: props.foodItem.price,
      amount: props.foodItem.amount + 1,
    }
    props.onAddClick(data)
  }
  
  return (
    <div>
      <div>
        <div className="m-4 flex justify-between text-lg ">
          <div className="h-20 my-4 ml-4 grid grid-rows-3 gap-4">
            <h1 className=" font-bold">{props.foodItem.name}</h1>
            <h2 className=" text-gray-500 italic">{props.foodItem.desc}</h2>
            <h3 className=" text-orange-500 font-bold">${props.foodItem.price}</h3>
          </div>
          <div className="h-20 mx-4 py-4 mr-6">
            <p>
              Amount: <input disabled={true} type="text" className="w-14 px-3 py-1 rounded-lg text-center border-2" value={props.foodItem.amount} />
            </p>
            <button onClick={submitHandler} className="rounded-3xl bg-orange-400 w-20 my-4 p-1">
              + Add
            </button>
          </div>
        </div>
        <div className="mx-1 border"></div>
      </div>
    </div>
  );
}

export default FoodItem;
