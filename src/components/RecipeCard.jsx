import { useNavigate } from 'react-router-dom';

const RecipeCard = ({title, image, idMeal}) => {
    const navigate = useNavigate();

    const handleClick = (idMeal) => {
        navigate(`/recipe/${idMeal}`);
    }

  return (
    <div className="overflow-hidden " onClick={() => handleClick(idMeal)} >
    <div className="bg-cover bg-center hover:scale-105 transition-all duration-300 cursor-pointer h-64 " style={{backgroundImage: `url(${image})`}}>
        <div className="bg-black/40 h-full hover:bg-black/20 transition-all duration-300 ">
            <h2 className="text-white text-lg lg:text-xl font-bold text-center p-6">{title}</h2>
        </div>
    </div>
    </div>
  )
}

export default RecipeCard