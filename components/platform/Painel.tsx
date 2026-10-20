import { Store } from "@/types/Store";

type Props = {
  stores: Store[];
};

export default function StoresList({ stores }: Props) {
  return (
    <div>
      {stores.map((s) => (
        <p>{s.name}</p>
      ))}
    </div>
  );
}
