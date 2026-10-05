import type { DiagramId } from "@/data/questions";

function Battery({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={y - 16} x2={x} y2={y + 16} stroke="currentColor" strokeWidth="1.5" />
      <line x1={x + 8} y1={y - 8} x2={x + 8} y2={y + 8} stroke="currentColor" strokeWidth="1.5" />
      <text x={x + 4} y={y - 22} textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="inherit">
        {label}
      </text>
    </g>
  );
}

function Bulb({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1={x - 4.5} y1={y - 4.5} x2={x + 4.5} y2={y + 4.5} stroke="currentColor" strokeWidth="1.1" />
      <line x1={x + 4.5} y1={y - 4.5} x2={x - 4.5} y2={y + 4.5} stroke="currentColor" strokeWidth="1.1" />
    </g>
  );
}

function CircuitI({ x }: { x: number }) {
  const top = 36;
  const bot = 118;
  const left = x + 28;
  const right = x + 108;
  const cols = [left + 20, left + 48, left + 76];
  return (
    <g>
      <text x={x + 68} y={22} textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
        I
      </text>
      <Battery x={x} y={77} label="3 V" />
      <line x1={x + 8} y1={77} x2={left} y2={77} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={left} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={right} y1={top} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={right} y2={top} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={bot} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      {cols.map((cx) => (
        <line key={cx} x1={cx} y1={top} x2={cx} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      ))}
      <Bulb x={cols[0]} y={58} />
      <Bulb x={cols[0]} y={88} />
      <Bulb x={cols[1]} y={77} />
      <Bulb x={cols[2]} y={77} />
    </g>
  );
}

function CircuitII({ x }: { x: number }) {
  const top = 36;
  const bot = 118;
  const left = x + 28;
  const right = x + 148;
  const cols = [left + 16, left + 40, left + 64, left + 88, left + 112];
  return (
    <g>
      <text x={x + 88} y={22} textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
        II
      </text>
      <Battery x={x} y={77} label="1.5 V" />
      <line x1={x + 8} y1={77} x2={left} y2={77} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={left} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={right} y1={top} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={right} y2={top} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={bot} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      {cols.map((cx) => (
        <g key={cx}>
          <line x1={cx} y1={top} x2={cx} y2={bot} stroke="currentColor" strokeWidth="1.4" />
          <Bulb x={cx} y={77} />
        </g>
      ))}
    </g>
  );
}

function CircuitIII({ x }: { x: number }) {
  const top = 36;
  const bot = 118;
  const left = x + 28;
  const right = x + 108;
  return (
    <g>
      <text x={x + 68} y={22} textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
        III
      </text>
      <Battery x={x} y={77} label="9 V" />
      <line x1={x + 8} y1={77} x2={left} y2={77} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={left} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={top} x2={right} y2={top} stroke="currentColor" strokeWidth="1.4" />
      <line x1={left} y1={bot} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <line x1={right} y1={top} x2={right} y2={bot} stroke="currentColor" strokeWidth="1.4" />
      <Bulb x={right} y={54} />
      <Bulb x={right} y={80} />
      <Bulb x={x + 68} y={bot} />
    </g>
  );
}

function Figure20() {
  return (
    <svg
      viewBox="0 0 520 168"
      className="h-auto w-full max-w-2xl text-fg"
      role="img"
      aria-label="Figure 20-1. Circuit I: 3 volt battery with mixed parallel branches. Circuit II: 1.5 volt battery with five bulbs in parallel. Circuit III: 9 volt battery with three bulbs in series."
    >
      <text x="260" y="14" textAnchor="middle" fill="currentColor" fontSize="11" opacity="0.7">
        Figure 20-1 · All bulbs are identical
      </text>
      <g transform="translate(8,18)">
        <CircuitI x={8} />
      </g>
      <g transform="translate(168,18)">
        <CircuitII x={8} />
      </g>
      <g transform="translate(368,18)">
        <CircuitIII x={8} />
      </g>
    </svg>
  );
}

const MAP = {
  figure20_1: Figure20,
};

export function QuestionDiagram({ id }: { id: DiagramId }) {
  const Figure = MAP[id];
  return (
    <div className="rounded-lg border border-border bg-elevated px-3 py-4">
      <Figure />
    </div>
  );
}
