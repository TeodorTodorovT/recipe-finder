import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    checkSavedRecipe,
    getRecipeDetails,
    saveRecipe,
    unSaveRecipe,
} from '../lib/api';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const RecipeDetails = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isSaved, setIsSaved] = useState(false);
    const { id } = useParams();
    const { data, isPending, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeDetails(id),
    });

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (data?.meals[0][`strIngredient${i}`]) {
            ingredients.push({
                ingredient: data?.meals[0][`strIngredient${i}`],
                measure: data?.meals[0][`strMeasure${i}`],
            });
        }
    }

    useEffect(() => {
        if (user) {
            checkSavedRecipe(id, user.id).then((data) => {
                console.log(data);

                setIsSaved(data ? true : false);
            });
        }
    }, [user, id]);

    const handleSave = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!isSaved) {
            saveRecipe(
                id,
                user.id,
                ingredients,
                data?.meals[0].strMeal,
                data?.meals[0].strMealThumb
            );
            setIsSaved(true);
        } else {
            unSaveRecipe(id, user.id);
            setIsSaved(false);
        }
    };

    console.log(data);

    return (
        <div className="bg-background-primery h-full">
            {isPending ? (
                <div className="text-white text-2xl font-bold">
                    <p className="text-center">Loading...</p>
                </div>
            ) : error ? (
                <div className="text-white text-2xl font-bold">
                    <p className="text-center">Something went wrong!</p>
                </div>
            ) : (
                <div className="flex flex-row lg:items-start justify-start min-h-screen pt-10">
                    <div className="flex flex-col lg:flex-row items-center gap-6 m-4">
                        <img
                            src={data?.meals[0].strMealThumb}
                            alt={data?.meals[0].strMeal}
                            className="w-3xs md:w-md object-cover self-center lg:self-start"
                        />
                        <div className="flex flex-col self-start">
                            <div className="flex justify-between gap-4">
                                <h1 className="text-white text-2xl md:text-4xl font-bold">
                                    {data?.meals[0].strMeal}
                                </h1>
                                <button
                                    className={`${
                                        isSaved
                                            ? 'bg-background-primery-700'
                                            : ''
                                    } text-white border-2 border-white rounded-md font-medium p-2 w-18 cursor-pointer max-h-12 `}
                                    onClick={handleSave}
                                >
                                    {isSaved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                            <p className="text-white text-lg md:text-xl">
                                {data?.meals[0].strCategory}
                            </p>
                            <p className="text-white text-lg md:text-xl">
                                {data?.meals[0].strArea}
                            </p>

                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="self-start flex-1/3 ">
                                    <h2 className="text-white text-xl md:text-2xl font-bold py-4">
                                        Ingredients
                                    </h2>
                                    <ul className="text-white text-lg md:text-xl">
                                        {ingredients.map(
                                            (ingredient, index) => (
                                                <li key={index}>
                                                    {ingredient.measure}{' '}
                                                    {ingredient.ingredient}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="self-start flex-2/3">
                                    <h2 className="text-white text-xl md:text-2xl font-bold py-4">
                                        Instructions
                                    </h2>
                                    <p className="text-white text-lg md:text-xl">
                                        {data?.meals[0].strInstructions}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;
