import supabase from './supabaseClient';

export const getRecipes = async (searchQuery) => {
    if (!searchQuery) {
        return null;
    }

    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
    );

    return await res.json();
};

export const getRecipeDetails = async (id) => {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    return await res.json();
};

export const saveRecipe = async (recipeId, userId, ingredients, title, thumbnail) => {
    const { data, error } = await supabase.from('favorites').insert({
        user_id: userId,
        recipe_id: recipeId,
        ingredients: JSON.stringify(ingredients),
        title: title,
        thumbnail: thumbnail,
    });

    if (error) {
        return error.message;
    }

    return data;
};

export const unSaveRecipe = async (recipeId, userId) => {
    const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('recipe_id', recipeId);

    if (error) {
        return error.message;
    }

    return data;
};

export const checkSavedRecipe = async (recipeId, userId) => {
    if (!userId || !recipeId) return false;

    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('recipe_id', recipeId)
        .maybeSingle();

    if (error) {
        return false;
    }

    return Boolean(data);
};


export const getSavedRecipes = async (userId) => {
    const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId);

    if (error) {
        return error.message;
    }

    return data;
}