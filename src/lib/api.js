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

export const getShoppingList = async (userId) => {
    if (!userId) return [];

    const { data, error } = await supabase
        .from('shopping_list')
        .select('shopping_list')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        return [];
    }

    const raw = data?.shopping_list;
    if (!raw) return [];

    try {
        // If stored as JSON string
        if (typeof raw === 'string') {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
        // If already JSON array
        return Array.isArray(raw) ? raw : [];
    } catch {
        return [];
    }
}

export const addToShoppingList = async (recipeId, userId) => {

    const recipe = await getRecipeDetails(recipeId);
    const shoppingList = await getShoppingList(userId);
    
    
    const recipeIngredients = [];



    for(let i = 1; i <= 20; i++) {

        const meal = recipe?.meals[0];
        

        const ingredientName = meal[`strIngredient${i}`];
        const amount = meal[`strMeasure${i}`];

        if(meal[`strIngredient${i}`]) {
            recipeIngredients.push({ingredientName, amount});
        }
    }

    let newShoppingList;

    if(Array.isArray(shoppingList) && shoppingList.length > 0) {
        newShoppingList = [...shoppingList, ...recipeIngredients];
    } else {
        newShoppingList = recipeIngredients;
    }



    // Update existing row; if none updated, insert new row
    const { data: updated, error: updateError } = await supabase
        .from('shopping_list')
        .update({ shopping_list: JSON.stringify(newShoppingList) })
        .eq('user_id', userId)
        .select();

    if (updateError) {
        return updateError.message;
    }

    if (!updated || updated.length === 0) {
        const { data: inserted, error: insertError } = await supabase
            .from('shopping_list')
            .insert({ user_id: userId, shopping_list: JSON.stringify(newShoppingList) })
            .select();

        if (insertError) {
            return insertError.message;
        }

        return inserted;
    }

    return updated;


}

export const removeFromShoppingList = async (recipeId, userId) => {
    const shoppingList = await getShoppingList(userId);
    const recipe = await getRecipeDetails(recipeId);

    if (!Array.isArray(shoppingList) || shoppingList.length === 0) {
        return [];
    }

    const recipeIngredients = [];

    for (let i = 1; i <= 20; i++) {
        const meal = recipe?.meals?.[0];
        const ingredientName = meal?.[`strIngredient${i}`];
        const amount = meal?.[`strMeasure${i}`];
        if (ingredientName) {
            recipeIngredients.push({ ingredientName, amount });
        }
    }

    const toRemove = new Set(
        recipeIngredients.map((ri) => `${ri.ingredientName}|${ri.amount}`)
    );

    const newShoppingList = shoppingList.filter((item) => {
        const key = `${item.ingredientName}|${item.amount}`;
        return !toRemove.has(key);
    });

    const { data, error } = await supabase
        .from('shopping_list')
        .update({ shopping_list: JSON.stringify(newShoppingList) })
        .eq('user_id', userId)
        .select();

    if (error) {
        return error.message;
    }

    return data;
}

export const clearShoppingList = async (userId) => {
    if (!userId) {
        return [];
    }

    // First try to update existing row
    const { data: updated, error: updateError } = await supabase
        .from('shopping_list')
        .update({ shopping_list: JSON.stringify([]) })
        .eq('user_id', userId)
        .select();

    if (updateError) {
        return updateError.message;
    }

    // If no row was updated, insert a new empty row for this user
    if (!updated || updated.length === 0) {
        const { data: inserted, error: insertError } = await supabase
            .from('shopping_list')
            .insert({ user_id: userId, shopping_list: JSON.stringify([]) })
            .select();

        if (insertError) {
            return insertError.message;
        }

        return inserted;
    }

    return updated;
}