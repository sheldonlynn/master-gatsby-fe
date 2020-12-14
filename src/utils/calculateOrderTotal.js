import calculatePizzaPrice from './calculatePIzzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // loop over item in order
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
