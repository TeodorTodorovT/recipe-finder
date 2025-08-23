import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSavedRecipes } from "../lib/api";
import RecipeCard from "../components/RecipeCard";
import { FaTrash, FaPlus } from "react-icons/fa";
import { unSaveRecipe } from "../lib/api";

const Favorites = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const { data, isPending, error } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: () => getSavedRecipes(user?.id),
        
    });

    console.log(data);
    

const {mutate: removeFavorite} = useMutation({
    mutationFn: (recipeId) => unSaveRecipe(recipeId, user.id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['favorites', user?.id] });
    }
})
    

    const handleRemove = async (recipeId) => {
        removeFavorite(recipeId);
    }

    return (
        <div className="bg-background-primery h-screen p-4 flex flex-row items-baseline gap-4">
            
        <div className="mt-4 flex-3/4">
        <h1 className="text-white text-4xl font-bold mb-4 text-center">Favorites</h1>
                
                {isPending ? <div className="text-white text-2xl font-bold text-center">Loading...</div> :
                error ? <div className="text-white text-2xl font-bold text-center">Error: {error.message}</div> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.length > 0 ? data.map((recipe) => (
                    <div key={recipe.recipe_id}>
                        <div className="flex flex-row-reverse gap-2">
                        <button className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer" onClick={() => handleRemove(recipe.recipe_id)}>
                            <FaTrash/>
                        </button>
                        <button className="text-white text-md font-bold text-center bg-background-primery-700 rounded-md p-2 mb-2 hover:bg-background-primery-800 cursor-pointer" >
                            <FaPlus/>
                        </button>
                        </div>
                    <RecipeCard
                        title={recipe.title}
                        image={recipe.thumbnail}
                        idMeal={recipe.recipe_id}
                    />
                    </div>
                    )) : <p className="text-white text-2xl font-bold text-center col-span-4">No favorites yet</p>}
                </div>
                }
        </div>

        <div className="mt-4 flex-1/4">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Shopping List</h2>
            {shoppingList.length > 0 ? shoppingList.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                </div>
            )) : <p className="text-white text-2xl font-bold text-center">No items in shopping list</p>}
        </div>
        </div>
    );
};

export default Favorites