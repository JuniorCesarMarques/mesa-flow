type IngredientCardProps = {
  ingredient: {
    id: string;
    nome: string;
  };
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function IngredientCard({
  ingredient,
  quantity,
  onIncrease,
  onDecrease,
}: IngredientCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="font-medium">{ingredient.nome}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity === 0}
          className="flex h-8 w-8 items-center justify-center rounded-md border"
        >
          -
        </button>

        <span className="w-5 text-center">{quantity}</span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-8 w-8 items-center justify-center rounded-md border"
        >
          +
        </button>
      </div>
    </div>
  );
}