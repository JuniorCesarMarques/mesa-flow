import PersonalizadoClient from "@/components/PersonalizadoClient";
import {
  getConfigsBySlug,
  getIngredientsBySlug,
} from "@/repositories/ingredients.repository";

export default async function Personalizado({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const configs = await getConfigsBySlug(slug);
  const ingredientes = await getIngredientsBySlug(slug);

  return <PersonalizadoClient ingredients={ingredientes} configs={configs} />;
}
