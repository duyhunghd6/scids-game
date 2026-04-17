/**
 * SciDS Game – Consolidated Question Data
 * Extracted from Grade 3 end-term science exams (test1, test2, test3)
 * Each topic has questions of types: multiple_choice, fill_in_blank, matching, short_answer
 * For the game, we simplify all to multiple-choice style for kid-friendly interaction.
 */

const TOPICS = [
  {
    id: 'earth-structure',
    name: 'Earth\'s Structure',
    emoji: '🌍',
    color: 0x4a90d9,
    questions: [
      {
        id: 'es1',
        question: 'What are the layers of the Earth from top to bottom?',
        options: [
          'Crust, Mantle, Outer Core, Inner Core',
          'Inner Core, Outer Core, Mantle, Crust',
          'Mantle, Crust, Inner Core, Outer Core',
          'Crust, Inner Core, Mantle, Outer Core'
        ],
        correct: 0,
        hint: 'Start from the surface where we live and work your way to the very center.'
      },
      {
        id: 'es2',
        question: 'Which layer of the Earth is solid and made of metal?',
        options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'],
        correct: 3,
        hint: 'This is the deepest part of the planet.'
      },
      {
        id: 'es3',
        question: 'Which layer is the thickest and made of liquid rock?',
        options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'],
        correct: 1,
        hint: 'It\'s located just below the crust.'
      },
      {
        id: 'es4',
        question: 'The Earth is shaped like a ___.',
        options: ['Cube', 'Ball', 'Cylinder', 'Cone'],
        correct: 1,
        hint: 'Think of the Earth\'s 3D shape!'
      },
      {
        id: 'es5',
        question: 'Which is NOT a layer of the Earth?',
        options: ['Crust', 'Mantle', 'Atmosphere', 'Inner Core'],
        correct: 2,
        hint: 'One of these is actually above the Earth\'s surface.'
      }
    ]
  },
  {
    id: 'muscles-movement',
    name: 'Muscles & Movement',
    emoji: '💪',
    color: 0xe74c3c,
    questions: [
      {
        id: 'mm1',
        question: 'Muscles are joined to the ___.',
        options: ['Skin', 'Skeleton', 'Brain', 'Heart'],
        correct: 1,
        hint: 'Think about what gives your body structure.'
      },
      {
        id: 'mm2',
        question: 'How do muscles move bones?',
        options: ['They push on bones', 'They pull on bones', 'They squeeze bones', 'They twist bones'],
        correct: 1,
        hint: 'Muscles can only do one action on bones.'
      },
      {
        id: 'mm3',
        question: 'Muscles work in ___.',
        options: ['Groups of three', 'Pairs', 'Alone', 'Groups of four'],
        correct: 1,
        hint: 'Think of opposite actions – one contracts, the other relaxes.'
      },
      {
        id: 'mm4',
        question: 'When one muscle contracts, the other muscle ___.',
        options: ['Also contracts', 'Relaxes', 'Disappears', 'Grows'],
        correct: 1,
        hint: 'The opposite action muscles take.'
      },
      {
        id: 'mm5',
        question: 'What is one health benefit of moving your body regularly?',
        options: ['Weaker bones', 'Stronger bones and muscles', 'Smaller heart', 'Less energy'],
        correct: 1,
        hint: 'Exercise makes body parts stronger.'
      }
    ]
  },
  {
    id: 'electrical-circuits',
    name: 'Electrical Circuits',
    emoji: '⚡',
    color: 0xf39c12,
    questions: [
      {
        id: 'ec1',
        question: 'Which of these is a conductor of electricity?',
        options: ['Plastic', 'Copper', 'Wood', 'Glass'],
        correct: 1,
        hint: 'Look for metals!'
      },
      {
        id: 'ec2',
        question: 'When you add MORE lamps to a circuit, all lamps shine...',
        options: ['More brightly', 'Less brightly', 'The same', 'They turn off'],
        correct: 1,
        hint: 'More lamps means energy has to be shared.'
      },
      {
        id: 'ec3',
        question: 'When you add MORE cells (batteries) to a circuit, lamps glow...',
        options: ['More brightly', 'Less brightly', 'The same', 'They turn off'],
        correct: 0,
        hint: 'Adding a cell adds more power to the circuit.'
      },
      {
        id: 'ec4',
        question: 'Which of these conducts electricity?',
        options: ['Cork', 'Pure water', 'Seawater', 'Glass'],
        correct: 2,
        hint: 'Salt water is special!'
      },
      {
        id: 'ec5',
        question: 'Why does a lamp NOT light when the switch is open?',
        options: [
          'The battery is dead',
          'The circuit is broken',
          'The lamp is broken',
          'It\'s too dark'
        ],
        correct: 1,
        hint: 'An open switch creates a gap in the circuit.'
      }
    ]
  },
  {
    id: 'heat-transfer',
    name: 'Heat Transfer',
    emoji: '🌡️',
    color: 0xe67e22,
    questions: [
      {
        id: 'ht1',
        question: 'As temperature increases, it takes ___ time for the bead to drop off the spoon.',
        options: ['More', 'Less', 'The same', 'No'],
        correct: 1,
        hint: 'Hotter water transfers energy faster.'
      },
      {
        id: 'ht2',
        question: 'Why does the bead fall off the spoon faster in hotter water?',
        options: [
          'The spoon melts',
          'The water has more energy to transfer to the spoon',
          'The bead gets smaller',
          'The spoon gets bigger'
        ],
        correct: 1,
        hint: 'Think about heat as energy moving through materials.'
      },
      {
        id: 'ht3',
        question: 'Heat energy moves from ___ objects to ___ objects.',
        options: ['Cold → Hot', 'Hot → Cold', 'Big → Small', 'Small → Big'],
        correct: 1,
        hint: 'Think about what happens when you hold a hot cup.'
      },
      {
        id: 'ht4',
        question: 'Which transfers heat the fastest?',
        options: ['Wood', 'Plastic', 'Metal', 'Rubber'],
        correct: 2,
        hint: 'Think about which material feels cold to touch.'
      },
      {
        id: 'ht5',
        question: 'All cooker, TV, lamp, and food mixer transfer electricity into...',
        options: ['Sound energy', 'Heat energy', 'Light energy', 'Movement energy'],
        correct: 1,
        hint: 'All electrical devices produce this type of energy.'
      }
    ]
  },
  {
    id: 'light-reflection',
    name: 'Light & Reflection',
    emoji: '💡',
    color: 0xf1c40f,
    questions: [
      {
        id: 'lr1',
        question: 'How do we see a cricket ball?',
        options: [
          'Light goes from our eyes to the ball',
          'Light from the sun hits the ball and reflects to our eyes',
          'The ball makes its own light',
          'We don\'t need light to see'
        ],
        correct: 1,
        hint: 'Light travels from the source, hits the object, and bounces to the eye.'
      },
      {
        id: 'lr2',
        question: 'Light travels in ___ lines.',
        options: ['Curved', 'Straight', 'Wavy', 'Zigzag'],
        correct: 1,
        hint: 'Light doesn\'t bend on its own.'
      },
      {
        id: 'lr3',
        question: 'When light hits a mirror, it changes direction because it is...',
        options: ['Absorbed', 'Reflected', 'Created', 'Destroyed'],
        correct: 1,
        hint: 'The light bounces off the shiny surface.'
      },
      {
        id: 'lr4',
        question: 'What type of diagram shows how light travels and reflects?',
        options: ['Energy diagram', 'Light diagram', 'Mirror diagram', 'Ray diagram'],
        correct: 3,
        hint: 'It uses arrows to show the path of light.'
      },
      {
        id: 'lr5',
        question: 'We see objects because light ___ off their surface into our eyes.',
        options: ['Absorbs', 'Reflects', 'Creates', 'Destroys'],
        correct: 1,
        hint: 'The light bounces off objects.'
      }
    ]
  },
  {
    id: 'volcanoes',
    name: 'Volcanoes',
    emoji: '🌋',
    color: 0xc0392b,
    questions: [
      {
        id: 'v1',
        question: 'What is the hot liquid rock underground called?',
        options: ['Lava', 'Magma', 'Rock', 'Sand'],
        correct: 1,
        hint: 'This is the molten rock BEFORE it reaches the surface.'
      },
      {
        id: 'v2',
        question: 'What is the opening at the top of a volcano called?',
        options: ['Magma chamber', 'Secondary cone', 'Crater', 'Earth\'s crust'],
        correct: 2,
        hint: 'It\'s the bowl-shaped opening at the very top.'
      },
      {
        id: 'v3',
        question: 'A volcano built up by many layers of hardened lava is called a...',
        options: ['Shield volcano', 'Composite volcano', 'Water volcano', 'Mini volcano'],
        correct: 1,
        hint: 'It\'s built up by many layers (strata).'
      },
      {
        id: 'v4',
        question: 'What word describes the sudden movement of the Earth\'s crust?',
        options: ['Tsunami', 'Volcano', 'Earthquake', 'Hurricane'],
        correct: 2,
        hint: 'The ground shakes!'
      },
      {
        id: 'v5',
        question: 'Liquid rock that flows out of a volcano is called...',
        options: ['Magma', 'Lava', 'Water', 'Gas'],
        correct: 1,
        hint: 'Once it reaches the surface, it has a different name than underground.'
      }
    ]
  },
  {
    id: 'animal-adaptations',
    name: 'Animal Adaptations',
    emoji: '🐦',
    color: 0x27ae60,
    questions: [
      {
        id: 'aa1',
        question: 'A bird that lives near a river and eats fish has a ___ beak.',
        options: ['Short and flat', 'Long and pointed', 'Short and hooked', 'Wide and round'],
        correct: 1,
        hint: 'Think of a beak shaped like a spear for catching slippery prey.'
      },
      {
        id: 'aa2',
        question: 'A bird that eats seeds has a ___ beak.',
        options: ['Long and pointed', 'Short and hooked', 'Wide and flat', 'Tiny and thin'],
        correct: 1,
        hint: 'Think of a beak designed to crack hard shells.'
      },
      {
        id: 'aa3',
        question: 'Camels have large feet to stop them sinking into the ___.',
        options: ['Water', 'Mud', 'Sand', 'Ice'],
        correct: 2,
        hint: 'Camels live in a very dry and sandy place.'
      },
      {
        id: 'aa4',
        question: 'Polar bears have thick fur to keep warm in the ___.',
        options: ['Desert', 'Jungle', 'Arctic', 'Ocean'],
        correct: 2,
        hint: 'A very cold place with ice and snow.'
      },
      {
        id: 'aa5',
        question: 'Animals with a skeleton INSIDE their body are called...',
        options: ['Invertebrates', 'Vertebrates', 'Insects', 'Reptiles'],
        correct: 1,
        hint: 'The skeleton is on the inside – vertebrae in the spine.'
      }
    ]
  },
  {
    id: 'states-of-matter',
    name: 'States of Matter',
    emoji: '🧊',
    color: 0x3498db,
    questions: [
      {
        id: 'sm1',
        question: 'A substance that flows and takes the shape of its container is a...',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        correct: 1,
        hint: 'Think of water in a glass.'
      },
      {
        id: 'sm2',
        question: 'A substance that keeps its own shape is a...',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        correct: 0,
        hint: 'Think of a rock or a book.'
      },
      {
        id: 'sm3',
        question: 'When ice changes to water, this is called...',
        options: ['Freezing', 'Melting', 'Boiling', 'Condensing'],
        correct: 1,
        hint: 'Solid → Liquid.'
      },
      {
        id: 'sm4',
        question: 'How do you change water back into ice?',
        options: ['Heat it up', 'Freeze it', 'Boil it', 'Stir it'],
        correct: 1,
        hint: 'Make it very cold!'
      },
      {
        id: 'sm5',
        question: 'Water is made from very small...',
        options: ['Rocks', 'Particles', 'Clouds', 'Stars'],
        correct: 1,
        hint: 'Tiny pieces too small to see.'
      },
      {
        id: 'sm6',
        question: 'Which word describes freezing?',
        options: ['Chemical', 'Reaction', 'Solidification', 'Substance'],
        correct: 2,
        hint: 'Liquid becomes solid.'
      },
      {
        id: 'sm7',
        question: 'Which solid flows like a liquid?',
        options: ['Iron magnet', 'Plastic spoon', 'Grains of sugar', 'Wooden ruler'],
        correct: 2,
        hint: 'Small grains can pour!'
      }
    ]
  },
  {
    id: 'earthquakes-tsunamis',
    name: 'Earthquakes & Tsunamis',
    emoji: '🌊',
    color: 0x2980b9,
    questions: [
      {
        id: 'et1',
        question: 'What is an epicentre?',
        options: [
          'The center of a volcano',
          'The point on the surface above where an earthquake begins',
          'The deepest part of the ocean',
          'A type of rock'
        ],
        correct: 1,
        hint: 'It\'s directly above where the fault slipped underground.'
      },
      {
        id: 'et2',
        question: 'What is a tsunami?',
        options: ['A type of volcano', 'A huge sea wave', 'A small earthquake', 'A desert storm'],
        correct: 1,
        hint: 'A massive displacement of water.'
      },
      {
        id: 'et3',
        question: 'Why were warnings sent to people living along the coast during a tsunami?',
        options: [
          'Because it will be sunny',
          'Because the tsunami could flood the coast',
          'Because there will be snow',
          'Because animals will come'
        ],
        correct: 1,
        hint: 'Consider the danger a giant wave poses to coastal areas.'
      },
      {
        id: 'et4',
        question: 'Why does Japan often have earthquakes?',
        options: [
          'It is a small country',
          'It is on the Pacific Ring of Fire',
          'It has many mountains',
          'It is an island'
        ],
        correct: 1,
        hint: 'Think about tectonic boundaries around the Pacific Ocean.'
      }
    ]
  },
  {
    id: 'earth-orbit',
    name: 'Earth\'s Orbit & Rotation',
    emoji: '🌎',
    color: 0x8e44ad,
    questions: [
      {
        id: 'eo1',
        question: 'What movement does the Earth make around its axis?',
        options: ['Spinning', 'Jumping', 'Sliding', 'Rolling'],
        correct: 0,
        hint: 'It\'s a rotational motion, like a top.'
      },
      {
        id: 'eo2',
        question: 'The Earth spinning on its axis causes...',
        options: ['Seasons', 'Day and night', 'Rain', 'Wind'],
        correct: 1,
        hint: 'Think about why the sun rises and sets.'
      },
      {
        id: 'eo3',
        question: 'The side of Earth facing AWAY from the Sun is having...',
        options: ['Day', 'Night', 'Summer', 'Winter'],
        correct: 1,
        hint: 'No direct sunlight reaches that side.'
      },
      {
        id: 'eo4',
        question: 'What is the star at the centre of our Solar System?',
        options: ['Moon', 'Mars', 'Sun', 'Jupiter'],
        correct: 2,
        hint: 'It gives us light and heat.'
      },
      {
        id: 'eo5',
        question: 'Which is NOT a planet in our Solar System?',
        options: ['Mars', 'Jupiter', 'Moon', 'Saturn'],
        correct: 2,
        hint: 'One of these orbits Earth, not the Sun.'
      }
    ]
  },
  {
    id: 'food-chains',
    name: 'Food Chains',
    emoji: '🌿',
    color: 0x2ecc71,
    questions: [
      {
        id: 'fc1',
        question: 'In a food chain, the producer is always a...',
        options: ['Animal', 'Plant', 'Rock', 'Human'],
        correct: 1,
        hint: 'Producers make their own food using sunlight.'
      },
      {
        id: 'fc2',
        question: 'A herbivore eats...',
        options: ['Other animals', 'Plants', 'Rocks', 'Everything'],
        correct: 1,
        hint: 'Herb = plant.'
      },
      {
        id: 'fc3',
        question: 'An animal that hunts other animals is called a...',
        options: ['Prey', 'Predator', 'Producer', 'Plant'],
        correct: 1,
        hint: 'The hunter, not the hunted.'
      },
      {
        id: 'fc4',
        question: 'In the food chain: leaf → caterpillar → chameleon → snake → mongoose, who is the herbivore?',
        options: ['Snake', 'Mongoose', 'Caterpillar', 'Chameleon'],
        correct: 2,
        hint: 'Who eats only plants?'
      }
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    emoji: '⚡',
    color: 0xd35400,
    questions: [
      {
        id: 'en1',
        question: 'Which type of energy is transferred from a loudspeaker to your ears?',
        options: ['Light', 'Sound', 'Heat', 'Movement'],
        correct: 1,
        hint: 'You hear it!'
      },
      {
        id: 'en2',
        question: 'Which type of energy is transferred when an object cools down?',
        options: ['Sound', 'Light', 'Heat', 'Electrical'],
        correct: 2,
        hint: 'The energy flows from hot to cold.'
      },
      {
        id: 'en3',
        question: 'Energy cannot be made, lost, used up or ___.',
        options: ['Transferred', 'Destroyed', 'Changed', 'Moved'],
        correct: 1,
        hint: 'Energy is always conserved.'
      },
      {
        id: 'en4',
        question: 'A food mixer transfers electrical energy into ___ energy.',
        options: ['Sound', 'Light', 'Movement', 'Heat only'],
        correct: 2,
        hint: 'The blades spin!'
      },
      {
        id: 'en5',
        question: 'When white powder reacts with vinegar, this is an example of a...',
        options: ['Physical change', 'Chemical reaction', 'Melting', 'Freezing'],
        correct: 1,
        hint: 'A new substance (gas) is produced.'
      }
    ]
  }
];

export default TOPICS;
