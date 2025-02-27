import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay";

type CaloriesProps = {
    activities: Activity[]
}

export default function Calories({activities} : CaloriesProps) {

    const caloriesConsumed = useMemo(() => 
        activities.reduce((total, activity) => 
            activity.category != 7 ? total + activity.calories : total, 0), [activities]
    );

    const caloriesBurned = useMemo(() => 
        activities.reduce((total, activity) => 
            activity.category === 7 ? total + activity.calories : total, 0), [activities]
    );

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">
                Calorie Summary
            </h2>

            <div className="flex flex-col items-center md:flex-row md:justify-center gap-5 mt-10">
                <CalorieDisplay 
                    calories={caloriesConsumed} 
                    text="Calories Consumed"
                />
                <CalorieDisplay 
                    calories={caloriesBurned} 
                    text="Calories Burned" 
                />
                <CalorieDisplay 
                    calories={netCalories} 
                    text="Calories Difference"
                />
            </div>
        </>
    )
}
