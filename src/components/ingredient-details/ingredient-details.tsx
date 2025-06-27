import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<string>();

  const ingredientData = useSelector(ingredientsSelectors.getIngredients).find(
    (item) => item._id === id
  );

  return !ingredientData ? (
    <Preloader />
  ) : (
    <IngredientDetailsUI ingredientData={ingredientData} />
  );
};
