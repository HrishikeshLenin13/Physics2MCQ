export type DiagramId =
  | "polarization"
  | "electroscopes"
  | "balloon"
  | "forceGraph"
  | "twoCharges"
  | "capacitorGraph";

export type Question = {
  id: number;
  prompt: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  diagram?: DiagramId;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt:
      "What happens when a rubber rod is rubbed with a piece of fur, giving it a negative charge?",
    choices: [
      "Protons are removed from the rod.",
      "The fur is also negatively charged.",
      "Electrons are added to the rod.",
      "The fur is left neutral.",
    ],
    answer: 2,
  },
  {
    id: 2,
    prompt: "A repelling force occurs between two charged objects when",
    choices: [
      "charges are of unlike signs.",
      "charges are of like signs.",
      "charges are of equal magnitude.",
      "charges are of unequal magnitude.",
    ],
    answer: 1,
  },
  {
    id: 3,
    prompt: "An attracting force occurs between two charged objects when",
    choices: [
      "charges are of unlike signs.",
      "charges are of like signs.",
      "charges are of equal magnitude.",
      "charges are of unequal magnitude.",
    ],
    answer: 0,
  },
  {
    id: 4,
    prompt: "When a glass rod is rubbed with silk and becomes positively charged,",
    choices: [
      "electrons are removed from the rod.",
      "protons are removed from the silk.",
      "protons are added to the silk.",
      "the silk remains neutral.",
    ],
    answer: 0,
  },
  {
    id: 5,
    prompt: "Electric charge is",
    choices: [
      "found only in a conductor.",
      "found only in insulators.",
      "conserved",
      "not conserved.",
    ],
    answer: 2,
  },
  {
    id: 6,
    prompt:
      "If a positively charged glass rod is used to charge a metal bar by induction,",
    choices: [
      "the charge on the bar will be equal in magnitude to the charge on the glass rod.",
      "the charge on the bar must be negative.",
      "the charge on the bar must be positive.",
      "the charge on the bar will be greater in magnitude than the charge on the glass rod.",
    ],
    answer: 1,
  },
  {
    id: 7,
    prompt: "Which of the following transfers charge most easily?",
    choices: ["nonconductors", "semiconductors", "conductors", "insulators"],
    answer: 2,
  },
  {
    id: 8,
    prompt: "Which sentence best characterizes electric conductors?",
    choices: [
      "They have low mass density.",
      "They have high tensile strength",
      "They have electric charges that move freely.",
      "They are poor heat conductors.",
    ],
    answer: 2,
  },
  {
    id: 9,
    prompt: "Which sentence best characterizes electric insulators?",
    choices: [
      "Charges on their surface do not move.",
      "Electric charges move freely in them.",
      "They have high tensile strength.",
      "They are good heat conductors.",
    ],
    answer: 0,
  },
  {
    id: 10,
    prompt:
      "The process of charging a conductor by bringing it near another charged object and then grounding the conductor is called",
    choices: [
      "charging by contact.",
      "charging by polarization",
      "induction",
      "neutralization.",
    ],
    answer: 2,
  },
  {
    id: 11,
    prompt: "The figure above demonstrates charging by",
    choices: ["grounding.", "polarization.", "induction.", "contact."],
    answer: 1,
    diagram: "polarization",
  },
  {
    id: 12,
    prompt: "Both insulators and conductors can be charged by",
    choices: ["grounding.", "polarization", "induction", "contact"],
    answer: 3,
  },
  {
    id: 13,
    prompt: "A surface charge can be produced on insulators by",
    choices: ["grounding", "polarization", "induction", "contact"],
    answer: 3,
  },
  {
    id: 14,
    prompt: "Unlike insulators, conductors can be charged by",
    choices: ["grounding", "polarization", "induction", "contact"],
    answer: 2,
  },
  {
    id: 15,
    prompt:
      "When a charged body is brought close to an uncharged body without touching it, a(n) ____ charge may result on the uncharged body. When a charged body is brought into contact with an uncharged body and then is removed, a(n) ____ charge may result on the uncharged body.",
    choices: [
      "negative; positive",
      "induced; residual",
      "positive; negative",
      "residual; induced",
    ],
    answer: 1,
  },
  {
    id: 16,
    prompt: "Which of the following is NOT true for BOTH gravitational and electric forces?",
    choices: [
      "The inverse square distance law applies.",
      "Forces are conservative.",
      "Potential energy is a function of distance of separation.",
      "Forces are either attractive or repulsive.",
    ],
    answer: 3,
  },
  {
    id: 17,
    prompt:
      "Two point charges, initially 2 cm apart, are moved to a distance of 10 cm apart. By what factor do the resulting electric and gravitational forces between them change?",
    choices: ["5", "1/5", "25", "1/25"],
    answer: 3,
  },
  {
    id: 18,
    prompt:
      "If the charge and mass are tripled for two identical charges maintained at a constant separation, the electric and gravitational forces between them will be changed by what factor?",
    choices: ["9", "1/9", "2/3", "18"],
    answer: 0,
  },
  {
    id: 19,
    prompt:
      "Two point charges, initially 1 cm apart, are moved to a distance of 3 cm apart. By what factor do the resulting electric and gravitational forces between them change?",
    choices: ["3", "1/3", "9", "1/9"],
    answer: 3,
  },
  {
    id: 20,
    prompt:
      "The relative distribution of charge density on the surface of a conducting solid depends upon which of the following?",
    choices: [
      "the shape of the conductor",
      "the mass density of the conductor",
      "the type of metal the conductor is made of",
      "the strength of Earth's gravitational field",
    ],
    answer: 0,
  },
  {
    id: 21,
    prompt:
      "At what point is the electric field of an isolated, uniformly charged, hollow metallic sphere greatest?",
    choices: [
      "at the center of the sphere",
      "at infinity",
      "at the sphere's inner surface",
      "at the sphere's outer surface",
    ],
    answer: 3,
  },
  {
    id: 22,
    prompt: "If a conductor is in electrostatic equilibrium,",
    choices: [
      "the total charge on the conductor must be zero.",
      "the electric field inside the conductor must be zero.",
      "any charges on the conductor must be uniformly distributed.",
      "the conductor is grounded.",
    ],
    answer: 1,
  },
  {
    id: 23,
    prompt: "If a conductor is in electrostatic equilibrium, the electric field inside the conductor",
    choices: [
      "is directed inward.",
      "is at its maximum level.",
      "is directed outward.",
      "is zero.",
    ],
    answer: 3,
  },
  {
    id: 24,
    prompt:
      "If a conductor is in electrostatic equilibrium, the electric field just outside a charged conductor",
    choices: [
      "is zero.",
      "is at its minimum level.",
      "is the same as it is in the center of the conductor.",
      "is perpendicular to the conductor's surface.",
    ],
    answer: 3,
  },
  {
    id: 25,
    prompt: "If a conductor is in electrostatic equilibrium, any excess charge",
    choices: [
      "flows to the ground.",
      "resides entirely on the conductor's outer surface.",
      "resides entirely on the conductor's interior.",
      "resides entirely in the center of the conductor.",
    ],
    answer: 1,
  },
  {
    id: 26,
    prompt:
      "If an irregularly-shaped conductor is in electrostatic equilibrium, charge accumulates",
    choices: [
      "where the radius of curvature is smallest.",
      "evenly throughout the conductor.",
      "where the radius of curvature is largest.",
      "in flat places.",
    ],
    answer: 0,
  },
  {
    id: 27,
    prompt: "Which of the following is NOT a characteristic of electrical potential energy?",
    choices: [
      "It is a form of mechanical energy.",
      "It results from a single charge.",
      "It results from the interaction between charges.",
      "It is associated with a charge in an electric field.",
    ],
    answer: 1,
  },
  {
    id: 28,
    prompt:
      "When a positive charge moves because of a force, what happens to the electrical potential energy associated with the charge's position in the system?",
    choices: [
      "It increases.",
      "It remains the same.",
      "It decreases.",
      "It sharply increases, and then decreases.",
    ],
    answer: 2,
  },
  {
    id: 29,
    prompt:
      "Two positive point charges are initially separated by a distance of 2 cm. If their separation is increased to 6 cm, the resultant electrical potential energy is equal to what factor times the initial electrical potential energy?",
    choices: ["3", "1/3", "9", "1/9"],
    answer: 1,
  },
  {
    id: 30,
    prompt: "Charge build up between the plates of a capacitor stops when",
    choices: [
      "there is no net charge on the plates.",
      "unequal amounts of charge accumulate on the plate.",
      "the potential difference between the plates is equal to the potential difference between the terminals of the battery.",
      "the charge on both plates is the same.",
    ],
    answer: 2,
  },
  {
    id: 31,
    prompt:
      "When comparing the net charge of a charged capacitor with the net charge of the same capacitor when it is uncharged, the net charge is",
    choices: [
      "greater in the charged capacitor.",
      "less in the charged capacitor.",
      "equal in both capacitors.",
      "greater or less in the charged capacitor, but never equal.",
    ],
    answer: 2,
  },
  {
    id: 32,
    prompt: "When a capacitor discharges,",
    choices: [
      "it must be attached to a battery.",
      "charges move back from one plate to another through the circuit until both plates are uncharged.",
      "charges move from one plate to another until equal and opposite charges accumulate on the plates.",
      "it cannot be connected to a material that conducts.",
    ],
    answer: 1,
  },
  {
    id: 33,
    prompt:
      "A capacitor consists of two metal plates; ____ is stored on one plate and ____ is stored on the other.",
    choices: [
      "negative charge; positive charge",
      "potential difference; internal resistance",
      "potential energy; kinetic energy",
      "residual charge; induced charge",
    ],
    answer: 0,
  },
  {
    id: 34,
    prompt:
      "Increasing the separation of the two charged parallel plates of a capacitor when they are disconnected from a battery will produce what effect on the capacitor?",
    choices: [
      "It will increase the charge.",
      "It will increase the capacitance.",
      "It will decrease the charge.",
      "It will decrease the capacitance.",
    ],
    answer: 3,
  },
  {
    id: 35,
    prompt:
      "Increasing the potential difference across the two plates of a capacitor will produce what effect on the capacitor?",
    choices: [
      "It will increase the charge.",
      "It will increase the capacitance.",
      "It will decrease the charge.",
      "It will decrease the capacitance.",
    ],
    answer: 0,
  },
  {
    id: 36,
    prompt: "The energy carried by each unit of current is called:",
    choices: ["amperage", "voltage", "resistance", "wattage"],
    answer: 1,
  },
  {
    id: 37,
    prompt: "A device use to detect the presence of a static charge is:",
    choices: ["a galvanometer.", "a voltmeter.", "a compass.", "an electroscope."],
    answer: 3,
  },
  {
    id: 38,
    prompt: "The unit of charge is the:",
    choices: ["ohm", "ampere.", "volt", "coulomb."],
    answer: 3,
  },
  {
    id: 39,
    prompt: "The positively charged particle in the nucleus of an atom is:",
    choices: ["an electron.", "a proton.", "a neutron.", "a neutrino."],
    answer: 1,
  },
  {
    id: 40,
    prompt:
      "When a charged object is brought near the knob of a positively charged electroscope, the leaves on the electroscope initially diverge. The charge on the object:",
    choices: [
      "must be zero.",
      "must be positive.",
      "must be negative.",
      "cannot be determined.",
    ],
    answer: 1,
  },
  {
    id: 41,
    prompt:
      "The diagram that best represents the charge distribution on a neutral electroscope when a negatively charged rod is held near it is:",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "electroscopes",
  },
  {
    id: 42,
    prompt:
      "A positively charged rod was used to give an electroscope a negative charge. The electroscope was charged by:",
    choices: ["induction", "conduction", "contact", "friction."],
    answer: 0,
  },
  {
    id: 43,
    prompt:
      "When a glass rod is rubbed with silk, the rod becomes positively charged due to the transfer of:",
    choices: [
      "electrons to the rod.",
      "protons to the silk.",
      "electrons to the silk.",
      "protons to the rod.",
    ],
    answer: 2,
  },
  {
    id: 44,
    prompt:
      "A rod and a piece of cloth are rubbed together. If the rod acquires a charge of +1 × 10⁻⁶ coulomb, the cloth acquires a charge of:",
    choices: [
      "0",
      "+1 × 10⁻⁶ coulomb.",
      "−1 × 10⁻⁶ coulomb.",
      "+1 × 10⁺⁶ coulombs.",
    ],
    answer: 2,
  },
  {
    id: 45,
    prompt: "The charge on one proton is approximately:",
    choices: [
      "9.1 × 10⁻³¹ coulomb.",
      "1.7 × 10⁻²⁷ coulomb.",
      "1.7 × 10⁻¹⁹ coulomb.",
      "6.3 × 10¹⁸ coulombs.",
    ],
    answer: 2,
  },
  {
    id: 46,
    prompt: "An electrically neutral object can be attracted by a positively charged object because:",
    choices: [
      "like charges repel each other.",
      "the charges on a neutral body can be redistributed.",
      "the neutral body becomes charged by friction.",
      "the net charge in a system varies.",
    ],
    answer: 1,
  },
  {
    id: 47,
    prompt: "The source of most electrons that flow in a circuit is a:",
    choices: ["battery.", "wire", "chemical reaction.", "nuclear reaction."],
    answer: 1,
  },
  {
    id: 48,
    prompt:
      "Garrick rubs an inflated balloon against his hair. He then touches the balloon against a non-conducting wall. The picture that most clearly represents the charge distribution on the balloon and wall is:",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "balloon",
  },
  {
    id: 49,
    prompt:
      "As the distance between two positively charged spheres increases, the force of repulsion between them:",
    choices: ["increases", "decreases.", "cannot be determined.", "remains the same."],
    answer: 1,
  },
  {
    id: 50,
    prompt:
      "The electric force between two positive point charges is F with a separation distance of d. The graph that best represents the relationship between F and d is:",
    choices: ["A", "B", "C", "D"],
    answer: 3,
    diagram: "forceGraph",
  },
  {
    id: 51,
    prompt:
      "Two charges, q₁ and q₂, are separated by a distance d. The change that would cause the greatest increase in the electrical force between the two charges is:",
    choices: [
      "doubling charge q₁ only.",
      "doubling d only.",
      "doubling d and charge q₁.",
      "doubling d and charge q₁ and q₂.",
    ],
    answer: 0,
    diagram: "twoCharges",
  },
  {
    id: 52,
    prompt: "A capacitor is a device that:",
    choices: ["charges electrons.", "charges protons.", "stores charge.", "stores resistance."],
    answer: 2,
  },
  {
    id: 53,
    prompt: "What is capacitance?",
    choices: [
      "The ability of a capacitor to store charge",
      "The ability of a capacitor to store resistance",
      "The buildup of electric charge on an object",
      "The flow of electric charge",
    ],
    answer: 0,
  },
  {
    id: 54,
    prompt: "What unit is used to measure capacitance?",
    choices: ["Coulomb", "Capace", "Farad", "Ohm"],
    answer: 2,
  },
  {
    id: 55,
    prompt: "Which of the graphs below best illustrates the behavior of a charging capacitor?",
    choices: ["A", "B", "C", "D"],
    answer: 0,
    diagram: "capacitorGraph",
  },
  {
    id: 56,
    prompt: "If the two oppositely charged terminals of a capacitor are connected:",
    choices: [
      "the excess electrons on the positive plate will be attracted to the negative plate and current will flow.",
      "the excess electrons on the negative plate will be attracted to the positive plate and current will flow.",
      "the excess electrons on the negative plate will be attracted to the positive plate and current will not flow.",
      "the excess electrons on the positive plate will be attracted to the negative plate and current will not flow.",
    ],
    answer: 1,
  },
  {
    id: 57,
    prompt: "Which of the following is NOT a way capacitance can be increased?",
    choices: [
      "Increase the size of a capacitor's plates",
      "Decrease the distance between a capacitor's plates",
      "Use a material that provides better electrical insulation between a capacitor's plates",
      "Decrease the thickness of the insulating layer between a capacitor's plates",
    ],
    answer: 3,
  },
];

export const LETTERS = ["A", "B", "C", "D"] as const;
export const TOTAL = QUESTIONS.length;
