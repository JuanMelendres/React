import { useMemo } from "react"
import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"

type OrderTotalsProps = {
    order : OrderItem[],
    tip: number,
    placeOrder: () => void
}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {

    const calculateSubtotal = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    const calculateTip =  useMemo(() => calculateSubtotal * tip, [tip, order]);

    const calculateTotal = useMemo(() => calculateSubtotal + calculateTip, [tip, order]);

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Order Totals & tip:</h2>

                <p>Subtotal: {''}
                    <span className="font-black">
                        {formatCurrency(calculateSubtotal)}
                    </span>
                </p>

                <p>Tip: {''}
                    <span className="font-black">
                        {formatCurrency(calculateTip)}
                    </span>
                </p>

                <p>Total: {''}
                    <span className="font-black">
                        {formatCurrency(calculateTotal)}
                    </span>
                </p>
            </div>

            <button 
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10" 
                onClick={() => placeOrder()}
                disabled={calculateTotal === 0}
            >
                Place order
            </button>
        </>
    
    )
}
