import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decrease,
  increase,
  removeFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { generateUniqueKey } from "@/lib/generateUniqueKey";
import { Extra, Size } from "@prisma/client";

const QuantityControl = ({
  id,
  selectedSize,
  selectedExtras,
}: {
  id: string;
  selectedSize: Size;
  selectedExtras: Extra[];
}) => {
  const cartItems = useAppSelector(selectCartItems);

  const dispatch = useAppDispatch();

  const key = generateUniqueKey(id, selectedSize, selectedExtras);

  const quantity = cartItems.find((e) => e.key === key)?.quantity;

  const handleItemIncrease = () => {
    dispatch(increase({ key }));
  };

  const handleItemDecrease = () => {
    dispatch(decrease({ key }));
  };

  const handleItemRemove = () => {
    dispatch(removeFromCart({ key }));
  };

  return (
    <div className="w-full text-center element-center gap-2 flex-wrap">
      <Button
        className="fully-rounded-btn"
        onClick={handleItemDecrease}
        disabled={quantity === 1}
      >
        -
      </Button>

      <p className="flex items-center gap-1">
        <strong>{quantity}</strong>
        <span className="text-accent">Items In Cart</span>
      </p>

      <Button className="fully-rounded-btn" onClick={handleItemIncrease}>
        +
      </Button>

      <Button className="basis-full mt-2 rounded-xl" onClick={handleItemRemove}>
        Remove This Item From Cart
      </Button>
    </div>
  );
};

export default QuantityControl;
