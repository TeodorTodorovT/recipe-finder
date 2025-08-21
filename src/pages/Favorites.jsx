import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getSavedRecipes } from "../lib/api";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {

    const { user } = useContext(AuthContext);

    const { data, isPending, error } = useQuery({
        queryKey: ['favorites', user?.id],
        queryFn: () => getSavedRecipes(user?.id),
    });
    
    console.log(data);
    
    return (
        <div className="bg-background-primery h-screen p-4">
        <h1 className="text-white text-4xl font-bold mb-4 text-center">Favorites</h1>
        <div className="mt-4">
                
                {isPending && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data && data.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        title={recipe.title}
                        image={recipe.thumbnail}
                        idMeal={recipe.recipe_id}
                    />
                ))}
                </div>
        </div>
        </div>
    );
};

export default Favorites