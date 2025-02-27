import { ActionDispatch, ChangeEvent, FormEvent, useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch : ActionDispatch<[action: ActivityActions]>,
    state: ActivityState
}

const initialState : Activity = {
    id: uuid(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            if (selectedActivity) {
                setActivity(selectedActivity);
            }
        }
    }, [state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    };

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        dispatch({type: 'save-activity', payload: {newActivity: activity}});

        setActivity({
            ...initialState,
            id: uuid()
        });
    };

    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold ">Category:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option 
                            key={category.id} 
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold ">Activity:</label>
                <input 
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="E.g. Food, Orange Juice, Salad, Exercise, Weights, Bicycle"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold ">Calories:</label>
                <input 
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories. E.g. 300 or 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-20"
                value={activity.category === 7 ? 'Add Exercise' : 'Add Food'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
