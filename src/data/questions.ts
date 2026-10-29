export type DiagramId =
  | "figure20_1"
  | "magnetism2"
  | "magnetism39"
  | "magnetism40"
  | "magnetism41"
  | "magnetism42"
  | "magnetism46"
  | "magnetism47"
  | "magnetism49";

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
    prompt: "Where is the magnitude of the magnetic field around a permanent magnet greatest?",
    choices: [
      "close to the poles",
      "far from the poles",
      "The magnitude is equal at all points on the field.",
      "The magnitude depends on the material of the magnet.",
    ],
    answer: 0,
  },
  {
    id: 2,
    prompt:
      "Which compass needle orientation in the figure above might correctly describe the magnet's field at that point?",
    choices: ["A", "B", "C", "D"],
    answer: 0,
    diagram: "magnetism2",
  },
  {
    id: 3,
    prompt: "Which describes magnetic declination?",
    choices: [
      "the angle between Earth's magnetic field and Earth's surface",
      "Earth's magnetic field strength at the equator",
      "the tendency for Earth's field to reverse itself",
      "the angle between directions to true north and magnetic",
    ],
    answer: 3,
  },
  {
    id: 4,
    prompt:
      "The current in a long wire creates a magnetic field in the region around the wire. How is the strength of that field at a given distance, r, from the wire's center related to r?",
    choices: [
      "the field is directly proportional to r",
      "the field is directly proportional to r2",
      "the field is inversely proportional to r",
      "the field is inversely proportional to r2",
    ],
    answer: 2,
  },
  {
    id: 5,
    prompt:
      "A current in a solenoid coil creates a magnetic field inside the coil. The field strength is directly proportional to the",
    choices: ["coil area.", "coil area and current.", "current.", "length."],
    answer: 2,
  },
  {
    id: 6,
    prompt:
      "A current in a solenoid with N turns creates a magnetic field inside the solenoid. The magnetic field strength is directly proportional to the",
    choices: [
      "number of turns only.",
      "strength of the current only.",
      "number of turns in the loop and the strength of the current.",
      "size of the solenoid.",
    ],
    answer: 2,
  },
  {
    id: 7,
    prompt:
      "A current in a long, straight wire produces a magnetic field. These magnetic field lines",
    choices: [
      "go out from the wire to infinity.",
      "form circles that pass through the wire.",
      "come in from infinity to the wire.",
      "form circles that go around the wire.",
    ],
    answer: 3,
  },
  {
    id: 8,
    prompt: "If a wire is carrying a strong, steady current, the magnetic field is",
    choices: [
      "proportional to the current and inversely proportional to the distance from the wire.",
      "proportional to the current and proportional to the distance from the wire.",
      "inversely proportional to the current and inversely proportional to the distance from the wire.",
      "inversely proportional to the current and proportional to the distance from the wire.",
    ],
    answer: 0,
  },
  {
    id: 9,
    prompt:
      "Which orientation characterizes the magnetic domains in a nonmagnetized piece of iron?",
    choices: [
      "parallel to the magnetic axis",
      "random",
      "antiparallel to the magnetic axis",
      "perpendicular to the magnetic axis",
    ],
    answer: 1,
  },
  {
    id: 10,
    prompt: "In a permanent magnet,",
    choices: [
      "domain alignment persists after the external magnetic field is removed.",
      "domain alignment becomes random after the external magnetic field is removed.",
      "domains are always randomly oriented.",
      "the magnetic fields of the domains cancel each other.",
    ],
    answer: 0,
  },
  {
    id: 11,
    prompt:
      "When an iron rod is inserted into a solenoid coil's center, the magnetic field produced by the current in the loops",
    choices: [
      "causes the iron to return to an unmagnetized state.",
      "forces the domain in the iron out of alignment.",
      "causes random orientation of the domains in the iron.",
      "causes alignment of the domains in the iron.",
    ],
    answer: 3,
  },
  {
    id: 12,
    prompt:
      "The direction of the force on a current-carrying wire in an external magnetic field is",
    choices: [
      "perpendicular to the current only.",
      "perpendicular to the magnetic field only.",
      "perpendicular to the current and to the magnetic field.",
      "parallel to the current and to the magnetic field.",
    ],
    answer: 2,
  },
  {
    id: 13,
    prompt: "What is the path of an electron moving perpendicular to a uniform magnetic field?",
    choices: ["a straight line", "an ellipse", "a circle", "a parabola"],
    answer: 2,
  },
  {
    id: 14,
    prompt: "What is the path of an electron moving parallel to a uniform magnetic field?",
    choices: ["straight line", "ellipse", "circle", "parabola"],
    answer: 0,
  },
  {
    id: 15,
    prompt:
      "A stationary positive charge, Q, is located in a magnetic field, B, which is directed toward the right, as shown in the figure above. The direction of the magnetic force on Q is",
    choices: ["toward the right.", "down", "up", "There is no magnetic force."],
    answer: 3,
  },
  {
    id: 16,
    prompt:
      "Consider two long, straight, parallel wires, each carrying a current I. If the currents move in opposite directions,",
    choices: [
      "the two wires will attract each other.",
      "the two wires will repel each other.",
      "the two wires will exert a torque on each other.",
      "neither wire will exert a force on the other.",
    ],
    answer: 1,
  },
  {
    id: 17,
    prompt:
      "Consider two long, straight, parallel wires, each carrying a current I. If the currents move in the same direction,",
    choices: [
      "the two wires will attract each other.",
      "the two wires will repel each other.",
      "the two wires will exert a torque on each other.",
      "neither wire will exert a force on the other.",
    ],
    answer: 0,
  },
  {
    id: 18,
    prompt:
      "A current-carrying conductor in and perpendicular to a magnetic field experiences a force that is",
    choices: [
      "perpendicular to the current.",
      "parallel to the current.",
      "inversely proportional to the potential difference.",
      "inversely proportional to the velocity",
    ],
    answer: 0,
  },
  {
    id: 19,
    prompt:
      "A loop of wire is held in a vertical position at the equator with the face of the loop facing in the east-west direction. What change will induce the greatest current in the loop?",
    choices: [
      "raising the loop to a higher elevation",
      "moving the loop north",
      "rotating the loop so its face is vertical",
      "rotating the loop so its face is north-south",
    ],
    answer: 3,
  },
  {
    id: 20,
    prompt:
      "A bar magnet falls through a loop of wire with constant velocity, and the north pole enters the loop first. The induced current will be greatest when the magnet is located so that the loop is",
    choices: [
      "near either the north or the south pole.",
      "near the north pole only.",
      "near the middle of the magnet.",
      "With no acceleration, the induced current is zero.",
    ],
    answer: 0,
  },
  {
    id: 21,
    prompt:
      "Electricity may be generated by rotating a loop of wire between the poles of a magnet. The induced current is greatest when",
    choices: [
      "the plane of the loop is parallel to the magnetic field.",
      "the plane of the loop is perpendicular to the magnetic field.",
      "the magnetic flux through the loop is a maximum.",
      "the plane of the loop makes an angle of 45° with the magnetic field.",
    ],
    answer: 1,
  },
  {
    id: 22,
    prompt: "According to Lenz's law, the magnetic field of an induced current in a conductor will",
    choices: [
      "enhance the applied field.",
      "heat the conductor.",
      "increase the potential difference.",
      "oppose a change in the applied magnetic field.",
    ],
    answer: 3,
  },
  {
    id: 23,
    prompt: "According to Lenz's law, if the applied magnetic field changes,",
    choices: [
      "the induced field attempts to keep the total field strength constant.",
      "the induced field attempts to increase the total field strength.",
      "the induced field attempts to decrease the total field strength.",
      "the induced field attempts to oscillate about an equilibrium value.",
    ],
    answer: 0,
  },
  {
    id: 24,
    prompt: "The operation of an electric motor depends on",
    choices: [
      "the Doppler effect.",
      "the photoelectric effect.",
      "the force acting on a current-carrying wire in a magnetic field.",
      "induced commutators from the rotation of a wire in a magnetic field.",
    ],
    answer: 2,
  },
  {
    id: 25,
    prompt: "Which conversion process is the basic function of the electric generator?",
    choices: [
      "mechanical energy to electrical energy",
      "low voltage to high voltage, or vice versa",
      "electrical energy to mechanical energy",
      "alternating current to direct current",
    ],
    answer: 0,
  },
  {
    id: 26,
    prompt: "Which conversion process is the basic function of the electric motor?",
    choices: [
      "mechanical energy to electrical energy",
      "low voltage to high voltage, or vice versa",
      "electrical energy to mechanical energy",
      "alternating current to direct current",
    ],
    answer: 2,
  },
  {
    id: 27,
    prompt: "Under which condition is the back emf in an electric motor at its maximum value?",
    choices: [
      "motor speed is zero",
      "voltage is at maximum",
      "current is at maximum",
      "motor speed is at maximum",
    ],
    answer: 3,
  },
  {
    id: 28,
    prompt:
      "In most electric generators, either the armature or the magnetic field is ____, generating a(n) ____.",
    choices: [
      "rotated; induced current",
      "interrupted; impulse change",
      "turned off; temporary dipole",
      "nonconducting; flux line",
    ],
    answer: 0,
  },
  {
    id: 29,
    prompt:
      "In a primary-secondary coil combination, the current in the secondary is maximum at the moment that which condition is met in the primary?",
    choices: [
      "the current is maximum in positive direction",
      "the current is maximum in negative direction",
      "the rate of current change is maximum",
      "the voltage is maximum in a positive direction",
    ],
    answer: 2,
  },
  {
    id: 30,
    prompt: "In a two-coil system, the mutual inductance depends on",
    choices: [
      "only the geometrical properties of the coils.",
      "only the orientation of the coils to each other.",
      "both the geometrical properties of the coils and their orientation to each other.",
      "neither the geometrical properties of the coils nor their orientation to each other.",
    ],
    answer: 2,
  },
  {
    id: 31,
    prompt: "The self-inductance of a solenoid increases under which condition?",
    choices: [
      "solenoid length is increased",
      "cross-sectional area is decreased",
      "number of coils per unit length is decreased",
      "number of coils is increased",
    ],
    answer: 3,
  },
  {
    id: 32,
    prompt: "How is the emf in a current-carrying inductor related to its self-inductance, L?",
    choices: [
      "It is directly proportional to L2.",
      "It is directly proportional to L.",
      "It is directly proportional to L1/2.",
      "It is inversely proportional to L.",
    ],
    answer: 1,
  },
  {
    id: 33,
    prompt:
      "How is the energy stored in a current-carrying inductor related to the current value, I?",
    choices: [
      "It is directly proportional to I2.",
      "It is directly proportional to I1/2.",
      "It is directly proportional to DI.",
      "It is inversely proportional to DI.",
    ],
    answer: 2,
  },
  {
    id: 34,
    prompt:
      "By what factor is the self-induction of a coil changed if its number of coil turns is tripled?",
    choices: ["1/3", "6", "3", "9"],
    answer: 2,
  },
  {
    id: 35,
    prompt: "The source of a material's magnetism is the:",
    choices: [
      "charge of its protons.",
      "mass of its neutrons.",
      "spin of its electrons.",
      "density of its nucleus.",
    ],
    answer: 2,
  },
  {
    id: 36,
    prompt: "If a 6-inch long bar magnet is cut one inch from the north pole end of the magnet:",
    choices: [
      "the short piece of the magnet has a north pole on one end and no pole on the other.",
      "the long piece of the magnet has a south pole on both ends.",
      "the short piece has a north pole on both ends.",
      "both pieces have a north and a south pole on each end.",
    ],
    answer: 3,
  },
  {
    id: 37,
    prompt:
      "Mike and Tom are trying to make a permanent magnet by stroking different metal bars with a powerful magnet. Which of the four metals is the poorest choice for their permanent magnet?",
    choices: ["Cobalt", "Copper", "Iron", "Nickel"],
    answer: 1,
  },
  {
    id: 38,
    prompt: "The magnitude of the magnetic field around a permanent magnet:",
    choices: [
      "is greatest close to the poles.",
      "is greatest far from the poles.",
      "is equal at all points on the field.",
      "depends on the material of the magnet.",
    ],
    answer: 0,
  },
  {
    id: 39,
    prompt:
      "The force between two bar magnets is measured as the magnets are moved away from one another. Which graph below best represents the relationship between the magnetic force and the distance between the magnets?",
    choices: ["A", "B", "C", "D"],
    answer: 3,
    diagram: "magnetism39",
  },
  {
    id: 40,
    prompt: "Which pair of objects in the diagram below experiences a repulsive force?",
    choices: ["A", "B", "C", "D"],
    answer: 1,
    diagram: "magnetism40",
  },
  {
    id: 41,
    prompt: "Which compass in the diagram below is pointing in the wrong direction?",
    choices: ["A", "B", "C", "D"],
    answer: 3,
    diagram: "magnetism41",
  },
  {
    id: 42,
    prompt:
      "A magnet is shown surrounded by its magnetic field. In which area is the magnetic field strongest?",
    choices: ["A", "B", "C", "D"],
    answer: 3,
    diagram: "magnetism42",
  },
  {
    id: 43,
    prompt: "Materials containing equal numbers of electrons with opposing spins are called:",
    choices: ["ferromagnetic", "paramagnetic", "diamagnetic", "monomagnetic."],
    answer: 0,
  },
  {
    id: 44,
    prompt:
      "Concerning the electron and magnetism, all of the following statements are true EXCEPT:",
    choices: [
      "electrons spin on their axes similar to the way the Earth spins on its axis.",
      "each individual electron in an atom is a tiny magnet.",
      "electron spin is responsible for the magnetic properties of a material.",
      "the location of the magnetic poles of an atom depends on the electron's spin",
    ],
    answer: 0,
  },
  {
    id: 45,
    prompt: "All of the following can be permanently strongly magnetized EXCEPT:",
    choices: ["neodymium", "carbon steel.", "tungsten steel.", "iron."],
    answer: 2,
  },
  {
    id: 46,
    prompt:
      "The direction of the magnetic field near the center of the current-carrying loop in the diagram is:",
    choices: ["into the page.", "out of the page.", "to the right.", "to the left."],
    answer: 0,
    diagram: "magnetism46",
  },
  {
    id: 47,
    prompt:
      "The diagram shows a coil of wire connected to a battery. The north pole of this coil is closest to:",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "magnetism47",
  },
  {
    id: 48,
    prompt:
      "Electromagnets are generally more useful than permanent magnets for all of the following reasons EXCEPT:",
    choices: [
      "they are always magnetized.",
      "their polarity can be changed.",
      "their strength can be altered.",
      "the magnetism can be turned off.",
    ],
    answer: 0,
  },
  {
    id: 49,
    prompt:
      "An electric current moving upward through a straight conductor creates a magnetic field. The diagram that correctly represents this magnetic field is:",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "magnetism49",
  },
  {
    id: 50,
    prompt:
      "The device that switches the polarity of the electromagnets giving motion to the rotor in an electric motor is the:",
    choices: ["armature", "commutator", "brush.", "knife switch."],
    answer: 1,
  },
  {
    id: 51,
    prompt: "The rotating element of a motor is often referred to as the:",
    choices: ["field coil.", "brush.", "commutator", "armature."],
    answer: 3,
  },
  {
    id: 52,
    prompt: "The key components of a motor include all of the following EXCEPT a :",
    choices: [
      "rotating element with magnets.",
      "double-throw knife switch.",
      "stationary magnet surrounding the rotor.",
      "commutator",
    ],
    answer: 1,
  },
  {
    id: 53,
    prompt: "The device that uses electromagnetic induction to produce electricity is called a:",
    choices: ["motor.", "rotor", "turbine", "generator."],
    answer: 3,
  },
  {
    id: 54,
    prompt: "When a magnet moves into a coil of wire, electric current is caused to flow by:",
    choices: ["conduction", "reduction", "induction.", "deduction"],
    answer: 2,
  },
  {
    id: 55,
    prompt:
      "The rotating machines driven by the flow of heated air that cause electrical generators to turn are called:",
    choices: ["commutators.", "rotisseries.", "turbines", "alternators."],
    answer: 2,
  },
  {
    id: 56,
    prompt:
      "Electricity can be generated if a loop of wire is turned between the poles of a magnet. The induced current will be greatest when the:",
    choices: [
      "plane of the loop is parallel to the magnetic field.",
      "plane of the loop is perpendicular to the magnetic field.",
      "magnetic flux through the loop is a maximum.",
      "plane of the loop makes a 45° angle with the magnetic field.",
    ],
    answer: 0,
  },
  {
    id: 57,
    prompt: "A current can be induced to flow in a coil in all of the following situations EXCEPT:",
    choices: [
      "holding a powerful magnet in the middle of a coil of wire.",
      "moving a coil of wire toward an electromagnet.",
      "sliding a bar magnet into a coil of wire.",
      "dropping a coil of wire over a bar magnet.",
    ],
    answer: 0,
  },
  {
    id: 58,
    prompt: "A generator's basic function is to convert:",
    choices: [
      "electrical energy to mechanical energy.",
      "alternating current to direct current.",
      "mechanical energy to electrical energy.",
      "high voltage to low voltage.",
    ],
    answer: 2,
  },
  {
    id: 59,
    prompt: "A motor's basic function is to convert:",
    choices: [
      "electrical energy to mechanical energy.",
      "alternating current to direct current.",
      "mechanical energy to electrical energy.",
      "high voltage to low voltage.",
    ],
    answer: 0,
  },
  {
    id: 60,
    prompt:
      "The motion of a magnet that induces the greatest alternating current to flow in a coil is:",
    choices: [
      "rapid movement in one direction through the coil.",
      "rapid back and forth movement of the magnet in the coil.",
      "slow movement in one direction through the coil.",
      "no motion of the magnet.",
    ],
    answer: 1,
  },
];

export const LETTERS = ["A", "B", "C", "D"] as const;
export const TOTAL = QUESTIONS.length;
