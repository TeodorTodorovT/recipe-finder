import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeDetails } from '../lib/api';

const RecipeDetails = () => {
    const { id } = useParams();
    const { data, isPending, error } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeDetails(id),
    });

    console.log(data);

    return (
        <div className="bg-background-primery h-full">
            {isPending ? (
                <div className="text-white text-2xl font-bold">Loading...</div>
            ) : error ? (
                <div className="text-white text-2xl font-bold">
                    Something went wrong!
                </div>
            ) : (
                <div className="flex flex-col items-center lg:items-start justify-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 m-4">
                        <img
                            src={data?.meals[0].strMealThumb}
                            alt={data?.meals[0].strMeal}
                            className="w-3xs md:w-md object-cover "
                        />
                        <div className="flex flex-col">
                            <h1 className="text-white text-4xl font-bold">
                                {data?.meals[0].strMeal}
                            </h1>
                            <p className="text-white text-xl">
                                {data?.meals[0].strCategory}
                            </p>
                            <p className="text-white text-xl">
                                {data?.meals[0].strArea}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 m-4">
                        <div className="self-start flex-1/3">
                            <h2 className="text-white text-2xl font-bold pb-4">
                                Ingredients
                            </h2>
                            <ul className="text-white text-xl">
                                {data?.meals[0].strIngredient1 && (
                                    <li>
                                        {data?.meals[0].strMeasure1}{' '}
                                        {data?.meals[0].strIngredient1}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient2 && (
                                    <li>
                                        {data?.meals[0].strMeasure2}{' '}
                                        {data?.meals[0].strIngredient2}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient3 && (
                                    <li>
                                        {data?.meals[0].strMeasure3}{' '}
                                        {data?.meals[0].strIngredient3}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient4 && (
                                    <li>
                                        {data?.meals[0].strMeasure4}{' '}
                                        {data?.meals[0].strIngredient4}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient5 && (
                                    <li>
                                        {data?.meals[0].strMeasure5}{' '}
                                        {data?.meals[0].strIngredient5}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient6 && (
                                    <li>
                                        {data?.meals[0].strMeasure6}{' '}
                                        {data?.meals[0].strIngredient6}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient7 && (
                                    <li>
                                        {data?.meals[0].strMeasure7}{' '}
                                        {data?.meals[0].strIngredient7}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient8 && (
                                    <li>
                                        {data?.meals[0].strMeasure8}{' '}
                                        {data?.meals[0].strIngredient8}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient9 && (
                                    <li>
                                        {data?.meals[0].strMeasure9}{' '}
                                        {data?.meals[0].strIngredient9}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient10 && (
                                    <li>
                                        {data?.meals[0].strMeasure10}{' '}
                                        {data?.meals[0].strIngredient10}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient11 && (
                                    <li>
                                        {data?.meals[0].strMeasure11}{' '}
                                        {data?.meals[0].strIngredient11}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient12 && (
                                    <li>
                                        {data?.meals[0].strMeasure12}{' '}
                                        {data?.meals[0].strIngredient12}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient13 && (
                                    <li>
                                        {data?.meals[0].strMeasure13}{' '}
                                        {data?.meals[0].strIngredient13}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient14 && (
                                    <li>
                                        {data?.meals[0].strMeasure14}{' '}
                                        {data?.meals[0].strIngredient14}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient15 && (
                                    <li>
                                        {data?.meals[0].strMeasure15}{' '}
                                        {data?.meals[0].strIngredient15}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient16 && (
                                    <li>
                                        {data?.meals[0].strMeasure16}{' '}
                                        {data?.meals[0].strIngredient16}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient17 && (
                                    <li>
                                        {data?.meals[0].strMeasure17}{' '}
                                        {data?.meals[0].strIngredient17}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient18 && (
                                    <li>
                                        {data?.meals[0].strMeasure18}{' '}
                                        {data?.meals[0].strIngredient18}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient19 && (
                                    <li>
                                        {data?.meals[0].strMeasure19}{' '}
                                        {data?.meals[0].strIngredient19}
                                    </li>
                                )}
                                {data?.meals[0].strIngredient20 && (
                                    <li>
                                        {data?.meals[0].strMeasure20}{' '}
                                        {data?.meals[0].strIngredient20}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="self-start flex-2/3">
                            <h2 className="text-white text-2xl font-bold pb-4">
                                Instructions
                            </h2>
                            <p className="text-white text-xl">
                                {data?.meals[0].strInstructions}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;
