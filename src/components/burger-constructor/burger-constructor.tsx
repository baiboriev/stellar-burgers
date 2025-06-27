import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { constructorSelectors } from '../../services/slices/constructor';
import { getCookie } from '../../utils/cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendOrderThunk } from '../../services/thunk/order';
import { orderActions } from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { bun, ingredients } = useSelector(constructorSelectors.getConstructor);
  const constructorItems = useMemo(
    () => ({
      bun: bun || null,
      ingredients: ingredients || []
    }),
    [bun, ingredients]
  );

  const { isLoading: orderRequest, orderModalData } = useSelector(
    (state) => state.order
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!getCookie('accessToken')) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    const data: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(sendOrderThunk(data));
  };
  const closeOrderModal = () => {
    dispatch(orderActions.resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
