import { Config } from "@/types/configs";
import ConfigCard from "./ConfigCard";

type ConfigsListProps = {
  configs: Config[];
  selected: string | null;
  handleSelected: (id: string) => void;
};

export default function ConfigsList({
  configs,
  selected,
  handleSelected,
}: ConfigsListProps) {
  return (
    <div className="flex gap-2">
      {configs.map((config) => (
        <ConfigCard
          selected={selected === config.id}
          key={config.id}
          config={config}
          onClick={() => handleSelected(config.id)}
        />
      ))}
    </div>
  );
}
