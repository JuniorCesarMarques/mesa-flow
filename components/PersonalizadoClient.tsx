"use client";

import { Config } from "@/types/configs";
import ConfigsList from "./ConfigsList";
import { useState } from "react";
import { Ingredient } from "@/types/ingredient";
import IngredientsList from "./IngredientsList";

export default function PersonalizadoClient({
  configs,
  ingredients
}: {
  configs: Config[];
  ingredients: Ingredient[];
}) {
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  const handleSelected = (id: string) => {
    setSelectedConfig(id);
  };

  return (
    <div className="mt-30 mx-4">
      <div className="flex items-center mb-5 gap-2">
        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
          1
        </span>
        <p className="text-blue-900 font-bold">
          Escolha o tamanho da embalagem
        </p>
      </div>
      <ConfigsList
        handleSelected={handleSelected}
        selected={selectedConfig}
        configs={configs}
      />
      <div className="flex items-center my-5 gap-2">
        <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
          2
        </span>
        <p className="text-blue-900 font-bold">
          Selecione as opções
        </p>
      </div>
      <IngredientsList ingredients={ingredients} />
    </div>
  );
}
