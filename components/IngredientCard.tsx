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
    <div className="flex flex-col items-center justify-between rounded-lg p-3 w-50 h-30 border border-slate-200">
      <span className="font-medium">{ingredient.nome}</span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity === 0}
          className="flex h-6 w-6 items-center justify-center rounded-full text-blue-600 bg-blue-100"
        >
          -
        </button>

        <span className="w-5 text-center text-blue-600">{quantity}</span>

        <button
          type="button"
          onClick={onIncrease}
          className="font-bold flex h-6 w-6 items-center justify-center rounded-full text-blue-600 bg-blue-100"
        >
          +
        </button>
      </div>
    </div>
  );
}
