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
  optics21: () => <img src="/questions/optics/q21.png" alt="Original geometric optics diagram for question 21" className="h-auto w-full max-w-sm mx-auto" />,
  optics22: () => <img src="/questions/optics/q22.png" alt="Original geometric optics diagram for question 22" className="h-auto w-full max-w-sm mx-auto" />,
  optics35: () => <img src="/questions/optics/q35.png" alt="Original geometric optics diagram for question 35" className="h-auto w-full max-w-sm mx-auto" />,
  optics48: () => <img src="/questions/optics/q48.png" alt="Original geometric optics diagram for question 48" className="h-auto w-full max-w-sm mx-auto" />,
  optics49: () => <img src="/questions/optics/q49.png" alt="Original geometric optics diagram for question 49" className="h-auto w-full max-w-sm mx-auto" />,
  optics50: () => <img src="/questions/optics/q50.png" alt="Original geometric optics diagram for question 50" className="h-auto w-full max-w-sm mx-auto" />,
  optics51: () => <img src="/questions/optics/q51.png" alt="Original geometric optics diagram for question 51" className="h-auto w-full max-w-sm mx-auto" />,
  optics56: () => <img src="/questions/optics/q56.png" alt="Original geometric optics diagram for question 56" className="h-auto w-full max-w-sm mx-auto" />,
  optics57: () => <img src="/questions/optics/q57.png" alt="Original geometric optics diagram for question 57" className="h-auto w-full max-w-sm mx-auto" />,
  optics58: () => <img src="/questions/optics/q58.png" alt="Original geometric optics diagram for question 58" className="h-auto w-full max-w-sm mx-auto" />,
  optics60: () => <img src="/questions/optics/q60.png" alt="Original geometric optics diagram for question 60" className="h-auto w-full max-w-sm mx-auto" />,
  figure20_1: Figure20,
  magnetism2: () => <img src="/questions/magnetism/q2.png" alt="Original diagram for question 2" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism39: () => <img src="/questions/magnetism/q39.png" alt="Original diagram for question 39" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism40: () => <img src="/questions/magnetism/q40.png" alt="Original diagram for question 40" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism41: () => <img src="/questions/magnetism/q41.png" alt="Original diagram for question 41" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism42: () => <img src="/questions/magnetism/q42.png" alt="Original diagram for question 42" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism46: () => <img src="/questions/magnetism/q46.png" alt="Original diagram for question 46" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism47: () => <img src="/questions/magnetism/q47.png" alt="Original diagram for question 47" className="h-auto w-full max-w-sm mx-auto" />,
  magnetism49: () => <img src="/questions/magnetism/q49.png" alt="Original diagram for question 49" className="h-auto w-full max-w-sm mx-auto" />,
};

export function QuestionDiagram({ id }: { id: DiagramId }) {
  const Figure = MAP[id];
  return (
    <div className="rounded-lg border border-border bg-elevated px-3 py-4">
      <Figure />
    </div>
  );
}
