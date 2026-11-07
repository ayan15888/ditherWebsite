export interface AnimalData {
  id: string;
  name: string;
  emoji: string;
  category: 'Forest' | 'Pets' | 'Savanna' | 'Ocean' | 'Insects & Birds';
  color: string;
  signature: string;
  personality: string;
}

export const ANIMALS: AnimalData[] = [
  { id: 'owl', name: 'Owl', emoji: '🦉', category: 'Forest', color: '#FF5A1F', signature: 'Head swivel & wide blinks', personality: 'Observant night watcher' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', category: 'Savanna', color: '#0A2BE0', signature: 'Water spray from trunk & ear flaps', personality: 'Majestic & gentle giant' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰', category: 'Forest', color: '#7B2FF7', signature: 'Binky hop & ear twitching', personality: 'Energetic & springy' },
  { id: 'fish', name: 'Fish', emoji: '🐟', category: 'Ocean', color: '#E6197A', signature: 'Speed dart & bubble blowing', personality: 'Quick swimmer' },
  { id: 'turtle', name: 'Turtle', emoji: '🐢', category: 'Ocean', color: '#16A37F', signature: 'Shell hide & flipper paddle', personality: 'Calm & wise' },
  { id: 'cat', name: 'Cat', emoji: '🐱', category: 'Pets', color: '#F59E0B', signature: 'Pounce + purr & playful tail swish', personality: 'Curious & affectionate' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧', category: 'Ocean', color: '#0D9488', signature: 'Waddles & side-to-side shuffle', personality: 'Cute icy explorer' },
  { id: 'frog', name: 'Frog', emoji: '🐸', category: 'Ocean', color: '#65A30D', signature: 'Big springy hops & tongue snap', personality: 'Lively pond jumper' },
  { id: 'octopus', name: 'Octopus', emoji: '🐙', category: 'Ocean', color: '#E11D48', signature: 'Water jet & wavy tentacles', personality: 'Mysterious deep sea pilot' },
  { id: 'bear', name: 'Bear', emoji: '🐻', category: 'Forest', color: '#8B5A2B', signature: 'Happy celebration dance', personality: 'Warm & cuddly dancer' },
  { id: 'lion', name: 'Lion', emoji: '🦁', category: 'Savanna', color: '#B45309', signature: 'Mane puff & fierce roar', personality: 'King of the savanna' },
  { id: 'tiger', name: 'Tiger', emoji: '🐯', category: 'Savanna', color: '#E8590C', signature: 'Stealth prowl & sharp eyes', personality: 'Silent jungle predator' },
  { id: 'dog', name: 'Dog', emoji: '🐶', category: 'Pets', color: '#6D4C41', signature: 'Fast tail wag & joyful tilts', personality: 'Faithful playful buddy' },
  { id: 'panda', name: 'Panda', emoji: '🐼', category: 'Savanna', color: '#1F2937', signature: 'Bamboo munching & belly roll', personality: 'Peaceful lazy gourmet' },
  { id: 'mouse', name: 'Mouse', emoji: '🐭', category: 'Pets', color: '#64748B', signature: 'Speedy scurry & cheese nibbles', personality: 'Tiny inquisitive scamperer' },
  { id: 'fox', name: 'Fox', emoji: '🦊', category: 'Forest', color: '#C2410C', signature: 'Sly sweep & bushy tail flick', personality: 'Clever woodland trickster' },
  { id: 'monkey', name: 'Monkey', emoji: '🐵', category: 'Savanna', color: '#A16207', signature: 'Playful branch swing', personality: 'Mischievous gymnast' },
  { id: 'duck', name: 'Duck', emoji: '🦆', category: 'Pets', color: '#EAB308', signature: 'Water wobble, quacks & head bob', personality: 'Cheerful pond waddler' },
  { id: 'sheep', name: 'Sheep', emoji: '🐑', category: 'Pets', color: '#6366F1', signature: 'Fluffy springy boings', personality: 'Gentle woolly cloud' },
  { id: 'hedgehog', name: 'Hedgehog', emoji: '🦔', category: 'Forest', color: '#57534E', signature: 'Defensive bristle & quick curl', personality: 'Spiky shy friend' },
  { id: 'koala', name: 'Koala', emoji: '🐨', category: 'Savanna', color: '#6B7280', signature: 'Sleepy tree hug & slow blinks', personality: 'Zen eucalyptus lounger' },
  { id: 'raccoon', name: 'Raccoon', emoji: '🦝', category: 'Forest', color: '#475569', signature: 'Sneaky paws & bandit peek', personality: 'Curious night explorer' },
  { id: 'whale', name: 'Whale', emoji: '🐋', category: 'Ocean', color: '#0EA5E9', signature: 'Spout geyser & ocean glide', personality: 'Gentle ocean sovereign' },
  { id: 'bee', name: 'Bee', emoji: '🐝', category: 'Insects & Birds', color: '#CA8A04', signature: 'Figure-8 buzz dance', personality: 'Busy pollinator' },
  { id: 'cow', name: 'Cow', emoji: '🐮', category: 'Pets', color: '#334155', signature: 'Calm chewing & rhythmic head nod', personality: 'Peaceful meadow grazer' },
  { id: 'giraffe', name: 'Giraffe', emoji: '🦒', category: 'Savanna', color: '#D97706', signature: 'Graceful neck sway & stretch', personality: 'Tall gentle stargazer' },
  { id: 'zebra', name: 'Zebra', emoji: '🦓', category: 'Savanna', color: '#111827', signature: 'Savanna gallop & striped dash', personality: 'Dazzling runner' },
  { id: 'crab', name: 'Crab', emoji: '🦀', category: 'Ocean', color: '#DC2626', signature: 'Sideways beach scuttle & pincer snip', personality: 'Feisty shore scout' },
  { id: 'flamingo', name: 'Flamingo', emoji: '🦩', category: 'Ocean', color: '#F43F5E', signature: 'One-leg balance & ribbon neck', personality: 'Elegant lagoon dancer' },
  { id: 'butterfly', name: 'Butterfly', emoji: '🦋', category: 'Insects & Birds', color: '#2563EB', signature: 'Gentle flutter & spiral drift', personality: 'Delicate summer flyer' },
  { id: 'snail', name: 'Snail', emoji: '🐌', category: 'Insects & Birds', color: '#A0623A', signature: 'Slow glide & eye-stalk retract', personality: 'Patience champion' },
  { id: 'squirrel', name: 'Squirrel', emoji: '🐿️', category: 'Forest', color: '#B5541C', signature: 'Acorn stash & tail whip', personality: 'Hyperactive hoarder' },
  { id: 'hippo', name: 'Hippo', emoji: '🦛', category: 'Savanna', color: '#6F85A6', signature: 'Huge river yawn & water snort', personality: 'Chunky river guardian' },
  { id: 'deer', name: 'Deer', emoji: '🦌', category: 'Forest', color: '#9C6B3C', signature: 'Forest bounds & antler tilt', personality: 'Noble woodland spirit' },
  { id: 'parrot', name: 'Parrot', emoji: '🦜', category: 'Insects & Birds', color: '#1F6FEB', signature: 'Wing flutter & whistle bob', personality: 'Vibrant conversationalist' },
  { id: 'kangaroo', name: 'Kangaroo', emoji: '🦘', category: 'Savanna', color: '#C98A4B', signature: 'Power boing leaps & tail bounce', personality: 'Outback champion' },
  { id: 'shark', name: 'Shark', emoji: '🦈', category: 'Ocean', color: '#5C7A99', signature: 'Surface fin slice & smooth cruise', personality: 'Apex ocean wanderer' },
  { id: 'chicken', name: 'Chicken', emoji: '🐔', category: 'Pets', color: '#C9A27A', signature: 'Scratch & rhythmic grain pecks', personality: 'Early morning herald' },
  { id: 'ladybug', name: 'Ladybug', emoji: '🐞', category: 'Insects & Birds', color: '#D62828', signature: 'Leaf crawl & elytra spread', personality: 'Lucky garden charm' },
  { id: 'wolf', name: 'Wolf', emoji: '🐺', category: 'Forest', color: '#6B7785', signature: 'Full moon howl & pack stance', personality: 'Wild midnight hunter' },
  { id: 'horse', name: 'Horse', emoji: '🐴', category: 'Pets', color: '#8B5E3C', signature: 'Mane toss & spirited hoof stamp', personality: 'Free plains galloper' },
  { id: 'camel', name: 'Camel', emoji: '🐪', category: 'Savanna', color: '#D0A050', signature: 'Desert stride & unbothered chew', personality: 'Dune crosser' },
  { id: 'rhino', name: 'Rhino', emoji: '🦏', category: 'Savanna', color: '#7B8794', signature: 'Horn scrape & armored charge', personality: 'Tough gentle wall' },
  { id: 'goat', name: 'Goat', emoji: '🐐', category: 'Pets', color: '#9A8F7D', signature: 'Mountain kick-hop & playful headbutt', personality: 'Daredevil cliff scaler' },
  { id: 'seal', name: 'Seal', emoji: '🦭', category: 'Ocean', color: '#3F6E8C', signature: 'Joyful flipper claps & bounce', personality: 'Playful arctic puppy' },
  { id: 'bat', name: 'Bat', emoji: '🦇', category: 'Insects & Birds', color: '#5B3A7A', signature: 'Wing drape & sonar hover', personality: 'Mystic cave flyer' },
  { id: 'crocodile', name: 'Crocodile', emoji: '🐊', category: 'Ocean', color: '#3C8D40', signature: 'River float & sudden jaw snap', personality: 'Patient prehistoric scout' },
  { id: 'jellyfish', name: 'Jellyfish', emoji: '🪼', category: 'Ocean', color: '#D36BC4', signature: 'Bioluminescent pulse & drift', personality: 'Ethereal floating jewel' },
  { id: 'peacock', name: 'Peacock', emoji: '🦚', category: 'Insects & Birds', color: '#0E8A8A', signature: 'Majestic fan tail shimmer', personality: 'Splendid feather artist' },
  { id: 'redpanda', name: 'Red Panda', emoji: '🐾', category: 'Savanna', color: '#C2410C', signature: 'Fluffy tail ripple & two-paw stand', personality: 'Adorable tree acrobat' },
];

