import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext(undefined);

export function OrderProvider({ children }) {
  // stick state in here
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
