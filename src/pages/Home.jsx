import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../lib/api';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const { data, isPending, error } = useQuery({
		queryKey: ['recipes', searchQuery],
		queryFn: () => getRecipes(searchQuery),
	});

	if (error) {
		return <div>Something went wrong!</div>;
	}

	const handleSearchClick = () => setSearchQuery(inputValue);

	const handleInputKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearchClick();
		}
	};

	return (
		<div className="bg-background-primery flex flex-col items-center min-h-[calc(100vh-56px)]">
			<div className="w-full max-w-md p-4 m-30">
                <p className="text-white text-3xl font-bold text-center p-10">What are you craving?</p>
				<div className="relative w-full">
					<input
						type="text"
						placeholder="Search for a recipe"
						className="w-full p-5 pr-28 rounded-full bg-background-primery-400 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleInputKeyDown}
						aria-label="Search recipes"
					/>
					<button
						type="button"
						className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-5 py-2 rounded-full shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary"
						onClick={handleSearchClick}
						aria-label="Search"
					>
						Search
					</button>
				</div>
			</div>

                <div className="w-full">
                    <div grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4>
                        {isPending ? (
                            <div className="text-white text-2xl font-bold">
                                <p className="text-center">Loading...</p>
                            </div>
                        ) : data?.meals === null ? (
                            <div className="text-white text-2xl font-bold">
                                <p className="text-center">No recipes found</p>
                            </div>
                        ) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{
                            data?.meals
                                ?.slice(0, 10)
                                .map((meal) => (
                                    <RecipeCard
                                        key={meal.idMeal}
                                        title={meal.strMeal}
                                        image={meal.strMealThumb}
                                        idMeal={meal.idMeal}
                                    />
                                ))
                        }</div>}
                    </div>
			</div>
		</div>
	);
};

export default Home;