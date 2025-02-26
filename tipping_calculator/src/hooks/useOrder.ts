import { useState } from "react";
import { MenuItem, OrderItem, MenuItemID } from "../types";

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([]);
    const [tip, setTip] = useState(0);

    const MAX_ITEMS = 5;

    const addToOrder = (item: MenuItem) => {
        const itemExists = order.find((orderItem)=> orderItem.id === item.id);

        if(itemExists) { // Element exists in the cart
            const updatedOrder = order.map((orderItem) => {
                if(orderItem.id === item.id && orderItem.quantity < MAX_ITEMS) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                }
                return orderItem;
            });
            setOrder(updatedOrder);
        } 
        else { // Element does not exist in the cart
            const newItem : OrderItem = {...item, quantity: 1};
            setOrder([...order, newItem]);
        }

    };

    const removeFromOrder = (id: MenuItemID) => {
        setOrder(order.filter((item) => item.id !== id));
    };

    const placeOrder = () => {
        alert('Order placed!');
        setOrder([]);
        setTip(0);
    };

    return {
        order,
        tip,
        setTip,
        addToOrder,
        removeFromOrder,
        placeOrder
    };
}
