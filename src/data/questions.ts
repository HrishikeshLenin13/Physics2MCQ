export type DiagramId =
  | "optics21"
  | "optics22"
  | "optics35"
  | "optics48"
  | "optics49"
  | "optics50"
  | "optics51"
  | "optics56"
  | "optics57"
  | "optics58"
  | "optics60"
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
    prompt: "Which portion of the electromagnetic spectrum is used in a television?",
    choices: ["infrared waves", "radio waves", "microwaves", "gamma waves"],
    answer: 1,
  },
  {
    id: 2,
    prompt: "Which portion of the electromagnetic spectrum is used in aircraft navigation?",
    choices: ["infrared waves", "radio waves", "microwaves", "ultraviolet light"],
    answer: 2,
  },
  {
    id: 3,
    prompt: "Which portion of the electromagnetic spectrum is used in a microscope?",
    choices: ["infrared waves", "visible light", "gamma rays", "ultraviolet light"],
    answer: 1,
  },
  {
    id: 4,
    prompt:
      "Which portion of the electromagnetic spectrum is used to sterilize medical instruments?",
    choices: ["infrared waves", "X rays", "microwaves", "ultraviolet light"],
    answer: 3,
  },
  {
    id: 5,
    prompt:
      "Which portion of the electromagnetic spectrum is used to identify fluorescent minerals?",
    choices: ["ultraviolet light", "infrared waves", "X rays", "gamma rays"],
    answer: 0,
  },
  {
    id: 6,
    prompt: "In a vacuum, electromagnetic radiation of short wavelengths",
    choices: [
      "travels as fast as radiation of long wavelengths.",
      "travels slower than radiation of long wavelengths.",
      "travels faster than radiation of long wavelengths.",
      "can travel both faster and slower than radiation of long wavelengths.",
    ],
    answer: 0,
  },
  {
    id: 7,
    prompt: "When red light is compared with violet light,",
    choices: [
      "both have the same frequency.",
      "both travel at the same speed.",
      "both have the same wavelength.",
      "red light travels faster than violet light.",
    ],
    answer: 1,
  },
  {
    id: 8,
    prompt:
      "If you know the wavelength of any form of electromagnetic radiation, you can determine its frequency because",
    choices: [
      "all wavelengths travel at the same speed.",
      "the speed of light varies for each form.",
      "wavelength and frequency are equal.",
      "the speed of light increases as wavelength increases.",
    ],
    answer: 0,
  },
  {
    id: 9,
    prompt:
      "The relationship between frequency, wavelength, and speed holds for light waves because",
    choices: [
      "light travels slower in a vacuum than in air.",
      "all forms of electromagnetic radiation travel at a single speed in a vacuum.",
      "light travels in straight lines.",
      "different forms of electromagnetic radiation travel at different speeds.",
    ],
    answer: 1,
  },
  {
    id: 10,
    prompt: "The farther light is from a source,",
    choices: [
      "the more spread out light becomes.",
      "the more bright light becomes.",
      "the more condensed light becomes.",
      "the more light is available per unit area.",
    ],
    answer: 0,
  },
  {
    id: 11,
    prompt:
      "If you are reading a book and you move twice as far away from the light source, how does the brightness at the new distance compare with that at the old distance? It is",
    choices: ["one-eighth", "one-half", "one-fourth", "twice"],
    answer: 2,
  },
  {
    id: 12,
    prompt:
      "Snow reflects almost all of the light incident upon it. However, a single beam of light is not reflected in the form of parallel rays. This is an example of ____ reflection off of a ____ surface.",
    choices: ["regular; rough", "diffuse; specular", "regular; specular", "diffuse; rough"],
    answer: 3,
  },
  {
    id: 13,
    prompt: "A highly polished finish on a new car provides a ____ surface for ____ reflection.",
    choices: ["rough; diffused", "rough; regular", "specular; diffused", "smooth; specular"],
    answer: 3,
  },
  {
    id: 14,
    prompt:
      "When incoming rays of light strike a flat mirror at an angle close to the surface of the mirror, the reflected rays are",
    choices: [
      "inclined high above the mirror's surface.",
      "perpendicular to the mirror's surface.",
      "parallel to the mirror's surface.",
      "close to the mirror's surface.",
    ],
    answer: 3,
  },
  {
    id: 15,
    prompt:
      "When a straight line is drawn perpendicular to a flat mirror at the point where an incoming ray strikes the mirror's surface, the angles of incidence and reflection are measured from the normal and",
    choices: [
      "the angles of incidence and reflection are equal.",
      "the angle of incidence is greater than the angle of reflection.",
      "the angle of incidence is less than the angle of reflection.",
      "the angle of incidence can be greater than or less than the angle of reflection.",
    ],
    answer: 0,
  },
  {
    id: 16,
    prompt:
      "If a light ray strikes a flat mirror at an angle of 27° from the normal, the reflected ray will be",
    choices: [
      "27° from the mirror's surface.",
      "90° from the mirror's surface.",
      "27° from the normal.",
      "63° from the normal.",
    ],
    answer: 2,
  },
  {
    id: 17,
    prompt: "The image of an object in a flat mirror is always",
    choices: [
      "larger than the object.",
      "independent of the size of the object.",
      "smaller than the object.",
      "the same size as the object.",
    ],
    answer: 3,
  },
  {
    id: 18,
    prompt:
      "When two parallel mirrors are placed so that their reflective sides face one another, ____ images form. This is because the image in one mirror becomes the ____ for the other mirror.",
    choices: [
      "multiple; object",
      "inverted; center of curvature",
      "reduced; virtual image",
      "Answer 4 (Optional)",
    ],
    answer: 0,
  },
  {
    id: 19,
    prompt: "Which of the following best describes the image produced by a flat mirror?",
    choices: [
      "virtual, inverted, and magnification greater than one",
      "real, inverted, and magnification less than one",
      "virtual, upright, and magnification equal to one",
      "real, upright, and magnification equal to one",
    ],
    answer: 2,
  },
  {
    id: 20,
    prompt:
      "When the reflection of an object is seen in a flat mirror, the distance from the mirror to the image depends on",
    choices: [
      "the wavelength of light used for viewing.",
      "the distance from the object to the mirror.",
      "the distance of both the observer and the object to the mirror.",
      "the size of the object.",
    ],
    answer: 1,
  },
  {
    id: 21,
    prompt: "In the diagram above, the image of object B would be",
    choices: [
      "virtual, enlarged, and inverted.",
      "virtual, reduced, and upright.",
      "real, enlarged, and upright.",
      "virtual, enlarged, and upright.",
    ],
    answer: 3,
    diagram: "optics21",
  },
  {
    id: 22,
    prompt: "In the diagram above, the image of object B would be",
    choices: [
      "real, reduced, and upright.",
      "virtual, reduced, and inverted.",
      "virtual, enlarged, and upright.",
      "virtual, reduced, and upright.",
    ],
    answer: 3,
    diagram: "optics22",
  },
  {
    id: 23,
    prompt:
      "Which best describes the image of a concave mirror when the object is located somewhere between the focal point and twice the focal-point distance from the mirror?",
    choices: [
      "virtual, upright, and magnification greater than one",
      "real, inverted, and magnification less than one",
      "virtual, upright, and magnification less than one",
      "real, inverted, and magnification greater than one",
    ],
    answer: 3,
  },
  {
    id: 24,
    prompt:
      "Which best describes the image of a concave mirror when the object is at a distance greater than twice the focal-point distance from the mirror?",
    choices: [
      "virtual, upright, and magnification greater than one",
      "real, inverted, and magnification less than one",
      "virtual, upright, and magnification less than one",
      "real, inverted, and magnification greater than one",
    ],
    answer: 1,
  },
  {
    id: 25,
    prompt:
      "Which best describes the image of a concave mirror when the object's distance from the mirror is less than the focal-point distance?",
    choices: [
      "virtual, upright, and magnification greater than one",
      "real, inverted, and magnification less than one",
      "virtual, upright, and magnification less than one",
      "real, inverted, and magnification greater than one",
    ],
    answer: 0,
  },
  {
    id: 26,
    prompt: "When the reflection of an object is seen in a flat mirror, the image is",
    choices: [
      "real and upright.",
      "virtual and upright.",
      "real and inverted.",
      "virtual and inverted.",
    ],
    answer: 1,
  },
  {
    id: 27,
    prompt:
      "When parallel rays that are also parallel to the principal axis strike a spherical mirror, rays that strike the mirror ____ the principal axis are focused at the focal point. Those rays that strike the mirror ____ the principal axis are focused at points between the mirror and the focal point.",
    choices: [
      "perpendicular to; far from",
      "close to; far from",
      "close to; perpendicular to",
      "far from; close to",
    ],
    answer: 1,
  },
  {
    id: 28,
    prompt:
      "A parabolic mirror, instead of a spherical mirror, can be used to reduce the occurrence of which effect?",
    choices: ["spherical aberration", "mirages", "chromatic aberration", "light scattering"],
    answer: 0,
  },
  {
    id: 29,
    prompt:
      "When red light and green light shine on the same place on a piece of white paper, the spot appears to be",
    choices: ["yellow.", "brown.", "white.", "black."],
    answer: 0,
  },
  {
    id: 30,
    prompt: "Which of the following is NOT an additive primary color?",
    choices: ["yellow", "blue", "green", "red"],
    answer: 0,
  },
  {
    id: 31,
    prompt: "What color does yellow pigment subtract from white light?",
    choices: ["yellow", "blue", "green", "red"],
    answer: 1,
  },
  {
    id: 32,
    prompt: "Which of the following is NOT a primary subtractive color?",
    choices: ["yellow", "magenta", "cyan", "blue"],
    answer: 3,
  },
  {
    id: 33,
    prompt:
      "A wave on a rope approaches two gratings in a row. The wave is polarized parallel to grating 1 and perpendicular to grating 2. The wave passes through",
    choices: ["only grating 1.", "both gratings.", "only grating 2.", "neither grating."],
    answer: 0,
  },
  {
    id: 34,
    prompt: "When the transmission axis is perpendicular to the plane of polarization for light,",
    choices: [
      "all the light passes through.",
      "little of the light passes through.",
      "most of the light passes through.",
      "no light passes through.",
    ],
    answer: 3,
  },
  {
    id: 35,
    prompt:
      "Which pair of glasses is best suited for automobile drivers? The transmission axes are shown by straight lines on the lenses. (Hint: The light reflects off the hood of the car.)",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "optics35",
  },
  {
    id: 36,
    prompt:
      "If you looked at a light through the lenses from two polarizing sunglasses that were overlapped at right angles to one another,",
    choices: [
      "all of the light would pass through.",
      "little of the light would pass through.",
      "most of the light would pass through.",
      "none of the light would pass through.",
    ],
    answer: 3,
  },
  {
    id: 37,
    prompt: "The ____ of light can change when light is refracted because the wavelength changes.",
    choices: ["frequency", "color", "media", "transparency"],
    answer: 1,
  },
  {
    id: 38,
    prompt:
      "When light passes at an angle to the normal from one material into another material in which its speed is lower,",
    choices: [
      "it is bent toward the normal to the surface.",
      "it always lies along the normal to the surface.",
      "it is unaffected.",
      "it is bent away from the normal to the surface.",
    ],
    answer: 0,
  },
  {
    id: 39,
    prompt:
      "When a light ray passes from water (n = 1.333) into diamond (n = 2.419) at an angle of 45°, its path is",
    choices: [
      "bent toward the normal.",
      "parallel to the normal.",
      "bent away from the normal.",
      "not bent.",
    ],
    answer: 0,
  },
  {
    id: 40,
    prompt:
      "When a light ray passes from zircon (n = 1.923) into fluorite (n = 1.434) at an angle of 60°, its path is",
    choices: [
      "bent toward the normal.",
      "bent away from the normal.",
      "parallel to the normal.",
      "not bent.",
    ],
    answer: 1,
  },
  {
    id: 41,
    prompt: "Atmospheric refraction of light rays is responsible for which effect?",
    choices: [
      "spherical aberration",
      "chromatic aberration",
      "mirages",
      "total internal reflection in a gemstone",
    ],
    answer: 2,
  },
  {
    id: 42,
    prompt:
      "If atmospheric refraction did not occur, how would the apparent time of sunrise and sunset be changed?",
    choices: [
      "Both would be later.",
      "Both would be earlier.",
      "Sunrise would be later, and sunset would be earlier.",
      "Sunrise would be earlier, and sunset would be later.",
    ],
    answer: 2,
  },
  {
    id: 43,
    prompt: "Which is NOT correct when describing the formation of rainbows?",
    choices: [
      "A rainbow is really spherical in nature.",
      "Sunlight is spread into a spectrum when it enters a spherical raindrop.",
      "Sunlight is internally reflected on the back side of a raindrop.",
      "The angle between the incident white light and the returning violet ray is 45°.",
    ],
    answer: 3,
  },
  {
    id: 44,
    prompt:
      "An image that is constructed in your brain from diverging rays reflected off an object is called a:",
    choices: ["real image.", "diffuse image.", "virtual image.", "refracted image."],
    answer: 2,
  },
  {
    id: 45,
    prompt: "An image projected onto a screen at a point where light rays meet is a:",
    choices: ["real image.", "diffuse image.", "virtual image.", "refracted image."],
    answer: 0,
  },
  {
    id: 46,
    prompt:
      "If a single incident light ray is scattered in all directions off a surface, this is known as:",
    choices: [
      "a convergent reflection.",
      "a specular reflection.",
      "dispersion.",
      "a diffuse reflection.",
    ],
    answer: 3,
  },
  {
    id: 47,
    prompt:
      "If a single incident light ray bounces off a surface in one direction, this is known as:",
    choices: [
      "a convergent reflection.",
      "dispersion",
      "a specular reflection.",
      "a diffuse reflection.",
    ],
    answer: 2,
  },
  {
    id: 48,
    prompt: "In Figure 17-1, the dotted line perpendicular to the surface is called the:",
    choices: ["focal point.", "reflected ray.", "incident ray.", "normal."],
    answer: 3,
    diagram: "optics48",
  },
  {
    id: 49,
    prompt: "In Figure 17-1, the angle of incidence is angle:",
    choices: ["A", "B", "C", "D"],
    answer: 1,
    diagram: "optics49",
  },
  {
    id: 50,
    prompt: "In Figure 17-1, ray #2 is called the:",
    choices: ["refracted ray.", "reflected ray.", "incident ray.", "normal."],
    answer: 1,
    diagram: "optics50",
  },
  {
    id: 51,
    prompt:
      "A ray of light is incident on a mirror. Which ray best describes the path of the reflected light from the mirror?",
    choices: ["A", "B", "C", "D"],
    answer: 2,
    diagram: "optics51",
  },
  {
    id: 52,
    prompt:
      "In the picture below, the person sees the image of the fish at a location different from the fish's actual location. This happens because the light rays reflected from the fish:",
    choices: [
      "experience total internal reflection.",
      "refract at the surface of the water.",
      "are a specular reflection.",
      "reflect at the surface of the water.",
    ],
    answer: 1,
  },
  {
    id: 53,
    prompt:
      "For a light ray crossing from one material to another, Snell's law provides a relationship that predicts the:",
    choices: [
      "amount of light reflected from the surface.",
      "angle at which the reflected light travels.",
      "extent of the scattering from the surface.",
      "degree of bending the light ray experiences.",
    ],
    answer: 3,
  },
  {
    id: 54,
    prompt:
      "A student constructs an experiment with a converging lens. Light rays travelling parallel to the axis of a converging lens hit the lens. After passing through the lens, the light rays:",
    choices: [
      "travel parallel to the axis of the lens.",
      "are bent away from the focal point on the near side of the lens.",
      "are bent toward the focal point on the far side of the lens.",
      "travel perpendicular to the axis of the lens.",
    ],
    answer: 2,
  },
  {
    id: 55,
    prompt:
      "An aperture is often used to produce sharper images by decreasing spherical aberration. An aperture works by:",
    choices: [
      "changing the shape of the lens.",
      "focusing all the rays at the same point.",
      "limiting the imaging rays to the center of the lens.",
      "inverting the image so that it is erect.",
    ],
    answer: 2,
  },
  {
    id: 56,
    prompt: "The image described in the ray diagram below is:",
    choices: [
      "real, erect, and larger.",
      "virtual, inverted, and smaller.",
      "real, inverted, and smaller.",
      "virtual, erect, and larger.",
    ],
    answer: 3,
    diagram: "optics56",
  },
  {
    id: 57,
    prompt: "The image described in the ray diagram below is:",
    choices: [
      "real, inverted, and smaller.",
      "real, inverted, and larger.",
      "virtual, inverted, and smaller.",
      "virtual, erect, and larger.",
    ],
    answer: 0,
    diagram: "optics57",
  },
  {
    id: 58,
    prompt: "The image described in the ray diagram below is:",
    choices: [
      "real, inverted, and smaller.",
      "virtual, inverted, and larger.",
      "real, inverted, and larger.",
      "virtual, erect, and larger.",
    ],
    answer: 1,
    diagram: "optics58",
  },
  {
    id: 59,
    prompt: "The magnification of a telescope is proportional to the:",
    choices: [
      "sum for the objective and eyepiece focal lengths.",
      "ratio of the objective and eyepiece focal lengths.",
      "product of the objective and eyepiece focal lengths.",
      "difference between the objective and eyepiece focal lengths.",
    ],
    answer: 1,
  },
  {
    id: 60,
    prompt:
      "Ray diagrams for two different reflecting telescopes are shown. Which of the following statements is TRUE?",
    choices: [
      "Telescope B collects more light than telescope A.",
      "Telescope B has a higher magnification than telescope A.",
      "The primary mirror of telescope A has a longer focal length than telescope B's mirror.",
      "The objective lens of telescope B has a longer focal length than the lens of telescope A.",
    ],
    answer: 1,
    diagram: "optics60",
  },
];
export const LETTERS = ["A", "B", "C", "D"] as const;
export const TOTAL = QUESTIONS.length;
