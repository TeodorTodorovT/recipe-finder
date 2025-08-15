export const getRecipes = async (searchQuery) => {
    if (!searchQuery) {
        return null;
    }

    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );

    return await res.json();
};