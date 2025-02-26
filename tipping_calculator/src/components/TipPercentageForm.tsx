import { Dispatch, SetStateAction } from "react"

const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-30',
        value: .30,
        label: '30%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipPercentageFormProps = {
    tip: number,
    setTip: Dispatch<SetStateAction<number>>, 
}

export default function TipPercentageForm({tip, setTip} : TipPercentageFormProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Tip:</h3>

            <form >
                {tipOptions.map((tipOption) => (
                    <div key={tipOption.id} className="flex items-center gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        <input 
                            type="radio" 
                            id={tipOption.id} 
                            name="tip" 
                            value={tipOption.value}
                            onChange={(e) => setTip(+e.target.value)}
                            checked={tipOption.value === tip}
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}
