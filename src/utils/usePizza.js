import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // create state to hold order
  // got rid of this line because moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);

  // make function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // make function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before item we want to remove
      ...order.slice(0, index),
      // everything after item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // send data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
