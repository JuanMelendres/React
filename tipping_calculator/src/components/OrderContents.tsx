import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"

type OrderContentsProps = {
    order : OrderItem[], 
    removeFromOrder: (id: number) => void,
}

export default function OrderContents({order, removeFromOrder} : OrderContentsProps) {
    return (
        <div>
            <h2 className="font-black text-4xl">Restaurant Consumption</h2>

            <div className="space-y-3 mt-10"> 
                {order.length != 0 &&
                    order.map((item) => (
                        <div 
                            key={item.id} 
                            className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b"
                        >
                            <div>
                                <p className="text-lg">
                                    {item.name} - {formatCurrency(item.price)}
                                </p>
                                <p className="font-black">
                                    Quantity: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                                </p>
                            </div>
                            
                            <button 
                                className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                                onClick={() => removeFromOrder(item.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
