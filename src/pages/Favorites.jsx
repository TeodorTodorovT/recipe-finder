import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addToShoppingList, getSavedRecipes, getShoppingList, removeFromShoppingList } from '../lib/api';
import RecipeCard from '../components/RecipeCard';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { unSaveRecipe } from '../lib/api';

const Favorites = () => {

    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isShoppingListOpen, setIsShoppingListOpen] = useState(true);
    const handleToggleShoppingList = () => setIsShoppingListOpen((prev) => !prev);
    const { data, isPending, error } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: () => getSavedRecipes(user?.id),
        enabled: Boolean(user?.id),
    });

    const { mutate: removeFavorite } = useMutation({
        mutationFn: (recipeId) => unSaveRecipe(recipeId, user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['favorites', user?.id],
            });
        },
    });

    const { data: shoppingListData } = useQuery({
        queryKey: ['shoppingList', user?.id],
        queryFn: () => getShoppingList(user?.id),
        enabled: Boolean(user?.id),
    });

    const handleRemove = async (recipeId) => {
        removeFavorite(recipeId);
    };

    const { mutate: addToShoppingListMutation } = useMutation({
        mutationFn: (recipeId) => addToShoppingList(recipeId, user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['shoppingList', user?.id],
            });
        },
    });

    const { mutate: removeFromShoppingListMutation } = useMutation({
        mutationFn: (recipeId) => removeFromShoppingList(recipeId, user.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['shoppingList', user?.id],
            });
        },
    });

    // console.log(shoppingListData);

    return (
        <div className="bg-background-primery min-h-screen p-4 flex flex-col lg:flex-row items-start gap-4  mx-auto">
            <div className="mt-4 w-full lg:w-3/4 lg:order-1">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
                    Favorites
                </h1>

                {isPending ? (
                    <div className="text-white text-2xl font-bold text-center">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="text-white text-2xl font-bold text-center">
                        Error: {error.message}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data?.length > 0 ? (
                            data.map((recipe) => (
                                <div key={recipe.recipe_id}>
                                    <div className="flex flex-row-reverse gap-2">
                                        <button
                                            type="button"
                                            aria-label="Remove from favorites"
                                            title="Remove from favorites"
                                            className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                                            onClick={() => handleRemove(recipe.recipe_id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    handleRemove(recipe.recipe_id);
                                                }
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Add ingredients to shopping list"
                                            title="Add to shopping list"
                                            className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                                            onClick={() => {
                                                if (!user?.id) return;
                                                addToShoppingListMutation(recipe.recipe_id);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    if (!user?.id) return;
                                                    addToShoppingListMutation(recipe.recipe_id);
                                                }
                                            }}
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Remove ingredients from shopping list"
                                            title="Remove from shopping list"
                                            className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                                            onClick={() => {
                                                removeFromShoppingListMutation(recipe.recipe_id);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    removeFromShoppingListMutation(recipe.recipe_id);
                                                }
                                            }}
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                    <RecipeCard
                                        title={recipe.title}
                                        image={recipe.thumbnail}
                                        idMeal={recipe.recipe_id}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center col-span-4">
                                No favorites yet
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-4 w-full order-first lg:order-2 lg:w-1/4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                        Shopping List
                    </h2>
                    <button
                        type="button"
                        className="text-white text-sm font-semibold bg-background-primery-700 rounded-md px-3 py-2 hover:bg-background-primery-800 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 lg:hidden"
                        onClick={handleToggleShoppingList}
                    >
                        {isShoppingListOpen ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div
                    id="shopping-list-panel"
                    aria-hidden={!isShoppingListOpen}
                    className={`${isShoppingListOpen ? '' : 'hidden'} lg:block`}
                >
                    {Array.isArray(shoppingListData) && shoppingListData.length > 0 ? (
                        shoppingListData.map((item, idx) => (
                            <div key={`${item.ingredientName}-${item.amount}-${idx}`}>
                                <p className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer">{item.ingredientName} {item.amount}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center">
                            No items in shopping list
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
