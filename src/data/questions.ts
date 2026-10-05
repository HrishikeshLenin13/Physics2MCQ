export type DiagramId = "figure20_1";

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
    prompt: "How is current affected if the number of charge carriers decreases?",
    choices: [
      "The current increases.",
      "The current decreases.",
      "The current initially decreases and then is gradually restored.",
      "The current is not affected.",
    ],
    answer: 1,
  },
  {
    id: 2,
    prompt:
      "How is current affected if the time interval decreases while the amount of charge remains the same?",
    choices: [
      "The current increases.",
      "The current decreases.",
      "The current initially increases and then is gradually restored.",
      "The current is not affected.",
    ],
    answer: 0,
  },
  {
    id: 3,
    prompt:
      "When you flip a switch to turn on a light, the delay time before the light turns on is determined by",
    choices: [
      "the number of electron collisions per second in the wire.",
      "the drift speed of the electrons in the wire.",
      "the speed of the electric field moving in the wire.",
      "the resistance of the wire.",
    ],
    answer: 2,
  },
  {
    id: 4,
    prompt: "When electrons move through a metal conductor,",
    choices: [
      "they move in a straight line through the conductor.",
      "they move in zigzag patterns because of repeated collisions with the vibrating metal atoms.",
      "the temperature of the conductor decreases.",
      "they move at the speed of light in a vacuum.",
    ],
    answer: 1,
  },
  {
    id: 5,
    prompt: "The energy gained by electrons as they are accelerated by an electric field is",
    choices: [
      "greater than the average loss in energy due to collisions.",
      "equal to the average loss in energy due to collisions.",
      "less than the average loss in energy due to collisions.",
      "not affected by the gain in energy due to collisions.",
    ],
    answer: 0,
  },
  {
    id: 6,
    prompt: "In a conductor that carries a current, the drift speed of an electron is",
    choices: [
      "less than the average speed of the electron between collisions.",
      "equal to the average speed of the electron between collisions.",
      "greater than the average speed of the electron between collisions.",
      "approximately equal to the speed of light.",
    ],
    answer: 0,
  },
  {
    id: 7,
    prompt: "The drift velocity in a wire is",
    choices: [
      "the average speed of electrons between collisions.",
      "the energy gained by electrons as they are accelerated by an electric field.",
      "the speed at which an electric field reaches electrons throughout a conductor.",
      "the net velocity of a charge carrier moving in an electric field.",
    ],
    answer: 3,
  },
  {
    id: 8,
    prompt: "In alternating current, the motion of the charges",
    choices: [
      "continuously changes in the forward and reverse directions.",
      "is equal to the speed of light.",
      "is greater than the speed of light.",
      "in the direction of the electric field.",
    ],
    answer: 0,
  },
  {
    id: 9,
    prompt: "Which of the following does NOT affect a material's resistance?",
    choices: ["length", "temperature", "the type of material", "Ohm's law"],
    answer: 3,
  },
  {
    id: 10,
    prompt:
      "Which of the following wires would have the LEAST resistance? (Assume that the wires have the same cross-sectional area.)",
    choices: [
      "an aluminum wire 10 cm in length",
      "a copper wire 10 cm in length",
      "an aluminum wire 5 cm in length",
      "a copper wire 5 cm in length",
    ],
    answer: 3,
  },
  {
    id: 11,
    prompt: "Which of the following wires would have the GREATEST resistance?",
    choices: [
      "an aluminum wire 10 cm in length and 3 cm in diameter",
      "an aluminum wire 5 cm in length and 3 cm in diameter",
      "an aluminum wire 10 cm in length and 5 cm in diameter",
      "an aluminum wire 5 cm in length and 5 cm in diameter",
    ],
    answer: 0,
  },
  {
    id: 12,
    prompt: "Which of the following wires would have the LEAST resistance?",
    choices: [
      "a copper wire 10 cm in length at 32°C",
      "a copper wire 10 cm in length at 10°C",
      "a copper wire 5 cm in length at 32°C",
      "a copper wire 5 cm in length at 10°C",
    ],
    answer: 3,
  },
  {
    id: 13,
    prompt: "Which of the following wires would have the LEAST resistance?",
    choices: [
      "an aluminum wire 20 cm in diameter at 40°C",
      "an aluminum wire 20 cm in diameter at 60°C",
      "an aluminum wire 40 cm in diameter at 40°C",
      "an aluminum wire 40 cm in diameter at 60°C",
    ],
    answer: 0,
  },
  {
    id: 14,
    prompt:
      "What happens to the resistance of a superconductor when its temperature drops below the critical temperature?",
    choices: [
      "The resistance is equal to that of a semiconductor with the same dimensions.",
      "The resistance doubles.",
      "The resistance drops to zero.",
      "The resistance reduces by one-half.",
    ],
    answer: 2,
  },
  {
    id: 15,
    prompt:
      "Consider a material that is cooled until it becomes a superconductor. If it is cooled even further, its resistance will",
    choices: ["increase.", "stay constant and nonzero.", "decrease.", "remain at zero."],
    answer: 3,
  },
  {
    id: 16,
    prompt: "When current is in a superconductor,",
    choices: [
      "the current continues even if the applied potential difference is removed.",
      "the current continues until the applied potential difference is removed.",
      "the current quickly decays unless it is powered by an external energy source.",
      "the superconductor MUST be above the critical temperature.",
    ],
    answer: 0,
  },
  {
    id: 17,
    prompt: "Which of the following statements about superconductors is correct?",
    choices: [
      "Superconductors require a magnet to carry current.",
      "Steady currents have been observed to persist for many years with no apparent decay in superconducting loops.",
      "Copper, silver, and gold are excellent superconductors.",
      "The resistance-temperature graph for a superconductor resembles that of a normal metal at temperatures below the critical temperature.",
    ],
    answer: 1,
  },
  {
    id: 18,
    prompt: "The power ratings on light bulbs are measures of the",
    choices: [
      "rate that they give off heat and light.",
      "voltage they require.",
      "density of the charge carriers.",
      "amount of negative charge passing through them.",
    ],
    answer: 0,
  },
  {
    id: 19,
    prompt:
      "When compared in a given time interval with other light bulbs in a 120 V outlet, a 60 W light bulb",
    choices: [
      "converts the same electrical energy to heat and light than a 40 W light bulb.",
      "converts more electrical energy to heat and light than a 100 W light bulb.",
      "converts less electrical energy to heat and light than a 40 W light bulb.",
      "converts less electrical energy to heat and light than a 100 W light bulb.",
    ],
    answer: 3,
  },
  {
    id: 20,
    prompt:
      "Tripling the current in a circuit with constant resistance has the effect of changing the power by what factor?",
    choices: ["1/3", "3", "1/9", "9"],
    answer: 3,
  },
  {
    id: 21,
    prompt: "Which process will double the power dissipated by a resistor?",
    choices: [
      "doubling the current while doubling the resistance",
      "doubling the current and making the resistance half as big",
      "doubling the current and doubling the potential difference",
      "doubling the current while making the potential difference half as big",
    ],
    answer: 1,
  },
  {
    id: 22,
    prompt: "Which of the following is TRUE about voltage in a series circuit?",
    choices: [
      "The total of all voltage drops must equal the total current.",
      "The total of all voltage drops must add up to zero.",
      "The total of all voltage drops must add up to the total voltage supplied by the battery.",
      "The total of all voltage drops must never exceed the total circuit resistance.",
    ],
    answer: 2,
  },
  {
    id: 23,
    prompt: "If there is a break at any point in a series circuit, the current will:",
    choices: [
      "stop everywhere in the circuit.",
      "leak out of the break point.",
      "be decreased by one-half.",
      "continue through remaining unbroken circuit branches.",
    ],
    answer: 0,
  },
  {
    id: 24,
    prompt: "When more devices are added to a series circuit, the total circuit resistance:",
    choices: [
      "decreases.",
      "increases.",
      "stays the same.",
      "may increase or decrease, depending on the device.",
    ],
    answer: 1,
  },
  {
    id: 25,
    prompt: "When more devices are added to a parallel circuit, the total circuit resistance:",
    choices: [
      "decreases.",
      "increases.",
      "stays the same.",
      "may increase or decrease, depending on the device.",
    ],
    answer: 0,
  },
  {
    id: 26,
    prompt: "What is the basic difference between series and parallel circuits?",
    choices: [
      "Simple series circuits are not used in electrical devices; parallel circuits are used in all electrical devices.",
      "In a series circuit, there are multiple paths for the flow of charge; in a parallel circuit, there are only two paths.",
      "A series circuit contains one path for the flow of charge; a parallel circuit contains more than one path.",
      "A series circuit obeys Ohm's law; a parallel circuit does not obey Ohm's law.",
    ],
    answer: 2,
  },
  {
    id: 27,
    prompt:
      "Suppose you connect more and more light bulbs in series to a battery. What happens to the brightness of each bulb as you add more bulbs?",
    choices: [
      "The bulbs grow brighter with each new bulb added.",
      "The bulbs grow dimmer with each new bulb added.",
      "There is no change in brightness.",
      "The brightness may increase or decrease, depending on the type of light bulb.",
    ],
    answer: 1,
  },
  {
    id: 28,
    prompt: "Which of the three circuit diagrams in Figure 20-1 represents a series circuit?",
    choices: ["I only", "II only", "III only", "I and II"],
    answer: 2,
    diagram: "figure20_1",
  },
  {
    id: 29,
    prompt: "Which circuit in Figure 20-1 would allow the battery to last the longest?",
    choices: ["I", "II", "III", "All would drain the battery at the same rate."],
    answer: 2,
    diagram: "figure20_1",
  },
  {
    id: 30,
    prompt: "Which of the following would create a total resistance of 0.5 ohm?",
    choices: [
      "Four 2-ohm resistors connected in parallel",
      "Four 2-ohm resistors connected in series",
      "Eight 2-ohm resistors connected in parallel",
      "Two 2-ohm resistors connected in series",
    ],
    answer: 0,
  },
  {
    id: 31,
    prompt: "A circuit containing two identical branches has:",
    choices: [
      "one-half the resistance it would have if it only contained one of the branches.",
      "twice the resistance it would have if it only contained one of the branches.",
      "the same resistance it would have if it only contained one of the branches.",
      "no resistance at all.",
    ],
    answer: 0,
  },
  {
    id: 32,
    prompt: "A 75-watt light bulb uses:",
    choices: [
      "75 joules of energy until it burns out.",
      "75 joules of energy every second.",
      "75 joules of energy every hour.",
      "75 watts of power every hour.",
    ],
    answer: 1,
  },
  {
    id: 33,
    prompt: "Which of the following is TRUE about alternating current?",
    choices: [
      "Alternating current flows in one direction only.",
      "Batteries run on alternating current.",
      "The electricity in your house uses alternating current.",
      "Simple battery and light bulb circuits use alternating current.",
    ],
    answer: 2,
  },
  {
    id: 34,
    prompt: "The power used by a circuit can be found by:",
    choices: [
      "using Ohm's law.",
      "dividing voltage by current.",
      "adding all resistances.",
      "multiplying voltage and current.",
    ],
    answer: 3,
  },
  {
    id: 35,
    prompt: "What do we buy from the electric utility company?",
    choices: [
      "Power, in watts",
      "Energy, in kilowatt-hours",
      "Current, in amperes",
      "Voltage, in volts",
    ],
    answer: 1,
  },
  {
    id: 36,
    prompt: "The watt is a unit that represents:",
    choices: [
      "the amount of energy consumed by electrical appliances.",
      "the flow of charge in a circuit.",
      "the rate at which energy is changed from one form to another.",
      "the potential energy difference between two places in a circuit.",
    ],
    answer: 2,
  },
  {
    id: 37,
    prompt:
      "How much would it cost to operate a 100-watt light bulb for 10 hours if the cost of electric energy is 10 cents per kilowatt-hour?",
    choices: ["1 dollar", "10 dollars", "10 cents", "1 cent"],
    answer: 2,
  },
  {
    id: 38,
    prompt: "Which of the following draws the most current?",
    choices: [
      "10-watt clock radio",
      "40-watt light bulb",
      "50-watt fan",
      "Each item above draws the same current.",
    ],
    answer: 2,
  },
  {
    id: 39,
    prompt:
      "If the potential difference across the bulb in a camping lantern is 9.0 V, what is the potential difference across the battery used to power it?",
    choices: ["1.0 V", "9.0 V", "3.0 V", "18 V"],
    answer: 1,
  },
  {
    id: 40,
    prompt:
      "If the potential difference across a pair of batteries used to power a flashlight is 6.0 V, what is the potential difference across the flashlight bulb?",
    choices: ["3.0 V", "9.0 V", "6.0 V", "12 V"],
    answer: 2,
  },
  {
    id: 41,
    prompt:
      "If the batteries in a portable CD player provide a terminal voltage of 12 V, what is the potential difference across the entire player?",
    choices: ["3.0 V", "6.0 V", "4.0 V", "12 V"],
    answer: 3,
  },
  {
    id: 42,
    prompt:
      "How does the potential difference across the bulb in a flashlight compare with the terminal voltage of the batteries used to power the flashlight?",
    choices: [
      "The potential difference is greater than the terminal voltage.",
      "The potential difference is less than the terminal voltage.",
      "The potential difference is equal to the terminal voltage.",
      "It cannot be determined unless the internal resistance of the batteries is known.",
    ],
    answer: 2,
  },
  {
    id: 43,
    prompt: "If a 9.0 V battery is connected to a light bulb, what is the potential difference across the bulb?",
    choices: ["3.0 V", "9.0 V", "4.5 V", "18 V"],
    answer: 1,
  },
  {
    id: 44,
    prompt:
      "Three resistors with values of 4.0 Ω, 6.0 Ω, and 8.0 Ω, respectively, are connected in series. What is their equivalent resistance?",
    choices: ["18 Ω", "6 Ω", "8 Ω", "1.8 Ω"],
    answer: 0,
  },
  {
    id: 45,
    prompt:
      "Three resistors connected in series carry currents labeled I₁, I₂, and I₃, respectively. Which of the following expresses the total current, Iₜ, in the system made up of the three resistors in series?",
    choices: [
      "Iₜ = I₁ + I₂ + I₃",
      "Iₜ = I₁ = I₂ = I₃",
      "Iₜ = (1/I₁ + 1/I₂ + 1/I₃)",
      "Iₜ = (1/I₁ + 1/I₂ + 1/I₃)⁻¹",
    ],
    answer: 1,
  },
  {
    id: 46,
    prompt:
      "Three resistors connected in series have voltages labeled ΔV₁, ΔV₂, and ΔV₃. Which of the following expresses the total voltage taken over the three resistors together?",
    choices: [
      "ΔVₜ = ΔV₁ + ΔV₂ + ΔV₃",
      "ΔVₜ = ΔV₁ = ΔV₂ = ΔV₃",
      "ΔVₜ = (1/ΔV₁ + 1/ΔV₂ + 1/ΔV₃)",
      "ΔVₜ = (1/ΔV₁ + 1/ΔV₂ + 1/ΔV₃)⁻¹",
    ],
    answer: 0,
  },
  {
    id: 47,
    prompt:
      "Three resistors with values of R₁, R₂, and R₃ are connected in series. Which of the following expresses the total resistance, Rₜ, of the three resistors?",
    choices: [
      "Rₜ = R₁ + R₂ + R₃",
      "Rₜ = R₁ = R₂ = R₃",
      "Rₜ = (1/R₁ + 1/R₂ + 1/R₃)",
      "Rₜ = (1/R₁ + 1/R₂ + 1/R₃)⁻¹",
    ],
    answer: 0,
  },
  {
    id: 48,
    prompt:
      "Three resistors connected in parallel carry currents labeled I₁, I₂, and I₃. Which of the following expresses the total current Iₜ in the combined system?",
    choices: [
      "Iₜ = I₁ + I₂ + I₃",
      "Iₜ = I₁ = I₂ = I₃",
      "Iₜ = (1/I₁ + 1/I₂ + 1/I₃)",
      "Iₜ = (1/I₁ + 1/I₂ + 1/I₃)⁻¹",
    ],
    answer: 0,
  },
  {
    id: 49,
    prompt:
      "Three resistors connected in parallel have voltages labeled ΔV₁, ΔV₂, and ΔV₃. Which of the following expresses the total voltage across the three resistors?",
    choices: [
      "ΔVₜ = ΔV₁ + ΔV₂ + ΔV₃",
      "ΔVₜ = ΔV₁ = ΔV₂ = ΔV₃",
      "ΔVₜ = (1/ΔV₁ + 1/ΔV₂ + 1/ΔV₃)",
      "ΔVₜ = (1/ΔV₁ + 1/ΔV₂ + 1/ΔV₃)⁻¹",
    ],
    answer: 1,
  },
  {
    id: 50,
    prompt:
      "Three resistors with values of R₁, R₂, and R₃ are connected in parallel. Which of the following expresses the total resistance, Rₜ, of the three resistors?",
    choices: [
      "Rₜ = R₁ + R₂ + R₃",
      "Rₜ = R₁ = R₂ = R₃",
      "Rₜ = (1/R₁ + 1/R₂ + 1/R₃)",
      "Rₜ = (1/R₁ + 1/R₂ + 1/R₃)⁻¹",
    ],
    answer: 3,
  },
];

export const LETTERS = ["A", "B", "C", "D"] as const;
export const TOTAL = QUESTIONS.length;
