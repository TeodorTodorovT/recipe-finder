import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../lib/api';
import RecipeCard from '../components/RecipeCard';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('chicken')
    const { data, isPending, error } = useQuery({
        queryKey: ['recipes', searchQuery],
        queryFn: () => getRecipes(searchQuery),
    });

    if (error) {
        return <div>Something went wrong!</div>
    }

    console.log(data?.meals.slice(0, 10));

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {isPending ? 'Loading...' :
                data?.meals.slice(0, 10).map((meal) => (
                    <RecipeCard key={meal.idMeal} title={meal.strMeal} image={meal.strMealThumb} idMeal={meal.idMeal} />
                ))
                }
        </div>
    );
};

export default Home;
