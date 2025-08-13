import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../lib/api';


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('chicken')
    const { data, isPending, error } = useQuery({
        queryKey: ['recipes', searchQuery],
        queryFn: () => getRecipes(searchQuery),
    });

    if (error) {
        return <div>Something went wrong!</div>
    }

    console.log(data?.meals.slice(0, 3));
    

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {isPending ? 'Loading...' :
                data?.meals.slice(0, 10).map((meal) => (
                    <div key={meal.idMeal}>
                        <h2>{meal.strMeal}</h2>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </div>
                ))
                }
        </div>
    );
};

export default Home;
