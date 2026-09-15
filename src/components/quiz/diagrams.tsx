import type { ReactNode } from "react";
import type { DiagramId } from "@/data/questions";

function Sign({
  x,
  y,
  plus,
}: {
  x: number;
  y: number;
  plus?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      fontSize="11"
      fontFamily="Figtree, sans-serif"
      fontWeight="600"
    >
      {plus ? "+" : "−"}
    </text>
  );
}

function PolarizationFigure() {
  return (
    <svg viewBox="0 0 320 150" className="h-auto w-full max-w-md text-fg" role="img" aria-label="Charged rod next to an insulator with induced charges">
      <text x="48" y="18" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="Figtree, sans-serif">
        Charged rod
      </text>
      <rect x="28" y="28" width="40" height="108" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[38, 54, 70, 86, 102, 118].map((y) => (
        <Sign key={y} x={48} y={y} />
      ))}
      <text x="210" y="18" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="Figtree, sans-serif">
        Insulator
      </text>
      <rect x="150" y="28" width="120" height="108" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[44, 62, 80, 98, 116].map((y) => (
        <Sign key={`p${y}`} x={172} y={y} plus />
      ))}
      {[44, 62, 80, 98, 116].map((y) => (
        <Sign key={`n${y}`} x={248} y={y} />
      ))}
      <text x="210" y="146" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="Figtree, sans-serif" opacity="0.75">
        Induced charges
      </text>
    </svg>
  );
}

function Electroscope({
  label,
  knob,
  leaves,
  x,
}: {
  label: string;
  knob: "plus" | "minus" | "none";
  leaves: "plus" | "minus" | "none";
  x: number;
}) {
  const signs = (kind: "plus" | "minus" | "none") =>
    kind === "none" ? [] : kind === "plus" ? [true, true] : [false, false];
  return (
    <g transform={`translate(${x},0)`}>
      <circle cx="40" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {signs(knob).map((plus, i) => (
        <Sign key={`k${i}`} x={32 + i * 16} y={28} plus={plus} />
      ))}
      <line x1="40" y1="44" x2="40" y2="62" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="62" x2="24" y2="92" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="62" x2="56" y2="92" stroke="currentColor" strokeWidth="1.5" />
      {signs(leaves).map((plus, i) => (
        <Sign key={`l${i}`} x={i === 0 ? 20 : 60} y={98} plus={plus} />
      ))}
      <text x="40" y="122" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="Figtree, sans-serif">
        {label}
      </text>
    </g>
  );
}

function ElectroscopesFigure() {
  return (
    <svg viewBox="0 0 360 140" className="h-auto w-full max-w-lg text-fg" role="img" aria-label="Four electroscope charge distributions labeled A through D">
      <Electroscope label="A" x={0} knob="minus" leaves="minus" />
      <Electroscope label="B" x={90} knob="plus" leaves="plus" />
      <Electroscope label="C" x={180} knob="plus" leaves="minus" />
      <Electroscope label="D" x={270} knob="minus" leaves="plus" />
    </svg>
  );
}

function BalloonPanel({
  label,
  balloonLeft,
  balloonRight,
  wallLeft,
  wallRight,
  x,
}: {
  label: string;
  balloonLeft: boolean;
  balloonRight: boolean;
  wallLeft: boolean;
  wallRight: boolean;
  x: number;
}) {
  return (
    <g transform={`translate(${x},0)`}>
      <ellipse cx="28" cy="48" rx="22" ry="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <Sign x={18} y={48} plus={balloonLeft} />
      <Sign x={36} y={48} plus={balloonRight} />
      <rect x="54" y="12" width="28" height="72" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <Sign x={64} y={48} plus={wallLeft} />
      <Sign x={76} y={48} plus={wallRight} />
      <text x="44" y="106" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="Figtree, sans-serif">
        {label}
      </text>
    </g>
  );
}

function BalloonFigure() {
  return (
    <svg viewBox="0 0 400 120" className="h-auto w-full max-w-lg text-fg" role="img" aria-label="Four balloon-and-wall charge distributions labeled A through D">
      <BalloonPanel label="A" x={8} balloonLeft={false} balloonRight={false} wallLeft={false} wallRight={false} />
      <BalloonPanel label="B" x={108} balloonLeft={false} balloonRight={false} wallLeft={true} wallRight={true} />
      <BalloonPanel label="C" x={208} balloonLeft={false} balloonRight={false} wallLeft={true} wallRight={false} />
      <BalloonPanel label="D" x={308} balloonLeft={true} balloonRight={true} wallLeft={false} wallRight={true} />
    </svg>
  );
}

function Axes({
  labelX,
  labelY,
  children,
}: {
  labelX: string;
  labelY: string;
  children: ReactNode;
}) {
  return (
    <g>
      <line x1="18" y1="70" x2="78" y2="70" stroke="currentColor" strokeWidth="1.2" />
      <line x1="18" y1="70" x2="18" y2="10" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="78,70 72,67 72,73" fill="currentColor" />
      <polygon points="18,10 15,16 21,16" fill="currentColor" />
      {children}
      <text x="48" y="84" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="Figtree, sans-serif">
        {labelX}
      </text>
      <text x="10" y="8" fill="currentColor" fontSize="10" fontFamily="Figtree, sans-serif">
        {labelY}
      </text>
    </g>
  );
}

function ForceGraphFigure() {
  return (
    <svg viewBox="0 0 400 110" className="h-auto w-full max-w-lg text-fg" role="img" aria-label="Four graphs of electric force F versus separation d">
      <g transform="translate(8,4)">
        <Axes labelX="d" labelY="F">
          <line x1="18" y1="70" x2="72" y2="16" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          A
        </text>
      </g>
      <g transform="translate(108,4)">
        <Axes labelX="d" labelY="F">
          <path d="M18 16 C 28 18, 36 28, 72 66" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          B
        </text>
      </g>
      <g transform="translate(208,4)">
        <Axes labelX="d" labelY="F">
          <line x1="18" y1="42" x2="72" y2="42" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          C
        </text>
      </g>
      <g transform="translate(308,4)">
        <Axes labelX="d" labelY="F">
          <path d="M20 16 C 28 18, 34 42, 42 54 C 52 66, 62 68, 74 69" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          D
        </text>
      </g>
    </svg>
  );
}

function TwoChargesFigure() {
  return (
    <svg viewBox="0 0 280 80" className="h-auto w-full max-w-sm text-fg" role="img" aria-label="Two charges q1 and q2 separated by distance d">
      <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="40" y="44" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="Figtree, sans-serif">
        q₁
      </text>
      <line x1="56" y1="40" x2="224" y2="40" stroke="currentColor" strokeWidth="1.2" />
      <text x="140" y="28" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="Figtree, sans-serif">
        d
      </text>
      <circle cx="240" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="240" y="44" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="Figtree, sans-serif">
        q₂
      </text>
    </svg>
  );
}

function CapacitorGraphFigure() {
  return (
    <svg viewBox="0 0 400 110" className="h-auto w-full max-w-lg text-fg" role="img" aria-label="Four graphs of charge versus time for a charging capacitor">
      <g transform="translate(8,4)">
        <Axes labelX="t" labelY="q">
          <path d="M18 68 C 28 20, 40 16, 74 16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          A
        </text>
      </g>
      <g transform="translate(108,4)">
        <Axes labelX="t" labelY="q">
          <path d="M18 16 C 28 64, 40 68, 74 68" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          B
        </text>
      </g>
      <g transform="translate(208,4)">
        <Axes labelX="t" labelY="q">
          <line x1="18" y1="68" x2="72" y2="16" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          C
        </text>
      </g>
      <g transform="translate(308,4)">
        <Axes labelX="t" labelY="q">
          <line x1="18" y1="16" x2="72" y2="68" stroke="currentColor" strokeWidth="1.6" />
        </Axes>
        <text x="48" y="100" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Figtree, sans-serif">
          D
        </text>
      </g>
    </svg>
  );
}

const MAP = {
  polarization: PolarizationFigure,
  electroscopes: ElectroscopesFigure,
  balloon: BalloonFigure,
  forceGraph: ForceGraphFigure,
  twoCharges: TwoChargesFigure,
  capacitorGraph: CapacitorGraphFigure,
};

export function QuestionDiagram({ id }: { id: DiagramId }) {
  const Figure = MAP[id];
  return (
    <div className="rounded-lg border border-border bg-elevated px-3 py-4">
      <Figure />
    </div>
  );
}
