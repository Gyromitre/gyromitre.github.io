const $ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document);

const dictionary = {
    _content: 'Événements',
    _npc: 'PNJs'
}

const cities = [
    {
        icon: '📍',
        $type: 'city',
        $pos: { left: 508, top: 244 },
        title: `Cité de Vallaki`,
        sub: `Ville principale de Barovie<br>"Tout ira bien!" - Baron Vargas Vallakovich`,
        _content: [],
        _npc: ['Rudolph Van Richten (Rictavio)', '[Martikov] (Urwin & Danika: Brom & Bray)', '[Vallakov] (Vargas & Lydia: Vitkor)', '[Wachters]<br>(Fiona & Nikolai{✝}: Stella, Karl & Nikolai)', 'Izek Stražni (capitaine)', 'Père Lucian Petrovich (Saint Andral)', 'Blinsky (fabricant de jouets)']
    },
    {
        icon: '📍',
        $type: 'city',
        $pos: { left: 1004, top: 464 },
        title: `Village de Barovie`,
        sub: `Au pied de Ravenloft`,
        _content: [],
        _npc: ['Ismark Kolyanovich', 'Ireena Kolyana', 'Tatyana']
    },
    {
        icon: '📍',
        $type: 'city',
        $pos: { left: 390, top: 441 },
        title: `Cité Engloutie de Berez`,
        sub: `Ruines, tragédie & marécages`,
        _content: [],
        _npc: []
    },
    {
        icon: '📍',
        $type: 'city',
        $pos: { left: 328, top: 345 },
        title: `Argynvostholt`,
        sub: `Bastion de l'Ordre du Dragon d'Argent`,
        _content: [],
        _npc: []
    },
    {
        icon: '📍',
        $type: 'city',
        $pos: { left: 146, top: 224 },
        title: `Commune Fortifiée de Krezk`,
        sub: `Sous l'Abbaye de Sainte Markovie`,
        _content: ['Symbole Sacré de Ravenkind ✮'],
        _npc: ['Le Vicaire', 'Vasilka (golem)', '[Krezkov]<br>(Dmitri & Anna: Alana{✝} & Ilya)', 'Corniauds']
    }
]

const pois = [
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 919, top: 302 },
        title: `Château de Ravenloft`,
        sub: `Fortresse noire,<br>Nommée en l'honneur<br>de Reine Ravenonia von Z.`,
        _content: [],
        _npc: ['Strahd von Zarovich{✝}', 'Rahadin']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 777, top: 460 },
        title: `Bassin de Tser`,
        sub: `Lectures de Tarokka et prophéties`,
        _content: [],
        _npc: ['Madame Eva']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 690, top: 236 },
        title: `Yedenpazul, "La Griffe"`,
        sub: `Mont isolé, résidence des géants de pierre`,
        _content:``,
        _npc: ['Rocheval', 'Kadaroc']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 598, top: 302 },
        title: `Moulin-à-Os`,
        sub: `Aux quatre vents, grincent les dents`,
        _content: ``,
        _npc: ['Morgantha', '?', '?']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 530, top: 330 },
        title: `Cercle de Monolithes`,
        sub: `Ruines d'un lieu sacré, oublié`,
        _content: [],
        _npc: []
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 481, top: 311 },
        title: `Mytìna (Arbre-Roi de Svalich)`,
        sub: `Clairière argentée, sereines mélopées`,
        _content: [],
        _npc: ['Pieknistieybrunisedystrom (Dryade)']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 449, top: 273 },
        title: `Campement Vistani`,
        sub: ``,
        _content: [],
        _npc: ['Luvash', 'Arrigal', 'Kasimir Velikov']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 298, top: 207 },
        title: `Tour du Mage`,
        sub: `Golems et portrait vivant<br>Surplombent le lac Baratok`,
        _content: ['Tome de Strahd ✮' , 'Van Richten{✝}'],
        _npc: ['Khazan (portrait)', `Ezmerelda d'Avenir`]
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 83, top: 359 },
        title: `Cépages du Mage`,
        sub: `Le vin, essence de la vie barovienne`,
        _content: [],
        _npc: ['Martikov (Davian)']
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 35, top: 455 },
        title: `Colline de Yester`,
        sub: `Arbre maudit et druides déchus`,
        _content: [],
        _npc: []
    },
    {
        icon: '📍',
        $type: 'poi',
        $pos: { left: 231, top: 217 },
        title: `Caverne de Volkov`,
        sub: `Crocs, violence et cruauté`,
        _content: [],
        _npc: ['Kiril (alpha)', 'Eilsen{✝}', 'Vieux Skennis', 'Zuleika (prêtresse)', 'Emil (prisonnier)']
    }
]

const events = [
    {
        icon: '⚔️',
        $type: 'combat',
        $pos: { left: 447, top: 201 },
        title: `Arabelle du Lac`,
        sub: `Âme libérée par l'Aube`,
        _content: [],
        _npc: []
    },
    {
        icon: '⚔️',
        $type: 'combat',
        $pos: { left: 394, top: 268 },
        title: `Machine Infernale`,
        sub: `Géant de paille, de fer & d'effroi<br>Griffes d'acier, harpons & chaînes`,
        _content: [],
        _npc: ['Tarkus (revenant)']
    }
];

const naturals = [
    {
        icon: '🏔️',
        $type: 'poi',
        $pos: { left: 840, top: 35 },
        title: `Mont Baratok`,
        sub: `Sommet des Montagnes Baratok`,
        _content: ``,
        _npc: []
    },
    {
        icon: '🏔️',
        $type: 'poi',
        $pos: { left: 522, top: 696 },
        title: `Mont Ghakis`,
        sub: `Sommet des Montagnes Balinok`,
        _content: ``,
        _npc: []
    },
    {
        icon: '🏔️',
        $type: 'poi',
        $pos: { left: 186, top: 69 },
        title: `Pic de Yordval`,
        sub: `Sommet des Montagnes Volkov`,
        _content: ``,
        _npc: []
    }
]

const g_data = { events, pois, cities, naturals };