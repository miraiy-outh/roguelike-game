import { TGameCeil } from "../services/types";

type TGameCeilProps = { entity: TGameCeil }

export function GameCeil(props: TGameCeilProps) {
  const { entity } = props;
  const { type } = entity;
  return <div className={`ceil ${type}`}>
    {
      type === "hero" || type === "enemy" ? <div className="hp" style={{ width: `${entity.hp}%` }} /> : null
    }
  </div>;
}
