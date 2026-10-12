import { Ingredient } from "@/types/ingredient";
import IngredientCard from "./IngredientCard";

export default function IngredientsList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div className="flex gap-2 flex-wrap">
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
