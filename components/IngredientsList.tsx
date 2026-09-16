import { Ingredient } from "@/types/ingredient";
import IngredientCard from "./IngredientCard";

export default function IngredientsList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div>
      {ingredients.map((i) => (
        <IngredientCard
          ingredient={i}
          onIncrease={() => {}}
          onDecrease={() => {}}
          quantity={0}
        />
      ))}
    </div>
  );
}
