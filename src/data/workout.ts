import { workout } from '../types/workout';

export const initialworkouts: workout[] = [
  {
    id: '1',
    title: 'BARBELL BENCH PRESS',
    category: ['CHEST', 'ARMS'],
    equipment: 'Barbell, Bench',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '6-8',
    duration: 25,
    calories: 180,
    rating: 4.8,
    image: 'https://placehold.co/600x600/1e293b/a3e635?text=Bench+Press',
    description: 'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.',
    instructions: [
      'Lie on the bench with eyes under the bar and feet planted.',
      'Unrack with locked elbows and lower the bar to mid-chest.',
      'Press up in a slight arc until elbows lock without bouncing.',
      'Keep shoulder blades pinched and a natural arch in the back.'
    ]
  },
  {
    id: '2',
    title: 'PULL-UP',
    category: ['BACK', 'ARMS'],
    equipment: 'Pull-up Bar',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '8-12',
    duration: 15,
    calories: 120,
    rating: 4.7,
    image: 'https://placehold.co/600x600/1e293b/a3e635?text=Pull+Up',
    description: 'An essential upper body bodyweight exercise targeting the lats, upper back, and biceps.',
    instructions: [
      'Grasp the bar with overhand grip slightly wider than shoulder-width.',
      'Pull yourself up until your chin clears the bar.',
      'Lower yourself back down with control to full extension.'
    ]
  },
  {
    id: '3',
    title: 'BACK SQUAT',
    category: ['LEGS', 'CORE'],
    equipment: 'Barbell, Rack',
    difficulty: 'Advanced',
    sets: 4,
    reps: '5-8',
    duration: 30,
    calories: 240,
    rating: 4.9,
    image: 'https://placehold.co/600x600/1e293b/a3e635?text=Back+Squat',
    description: 'The king of lower body exercises focusing on quadriceps, glutes, and core stability.',
    instructions: [
      'Rest the bar across your upper traps and unrack.',
      'Squat down by bending hips and knees simultaneously until thighs are parallel to floor.',
      'Drive up through the mid-foot back to standing.'
    ]
  },
  {
    id: '4',
    title: 'RUSSIAN TWIST',
    category: ['CORE'],
    equipment: 'Medicine Ball',
    difficulty: 'Beginner',
    sets: 3,
    reps: '15-20',
    duration: 8,
    calories: 70,
    rating: 4.1,
    image: 'https://placehold.co/600x600/1e293b/a3e635?text=Russian+Twist',
    description: 'A rotational core exercise targeting the obliques and abdominal wall.',
    instructions: [
      'Sit on floor with knees bent and feet slightly elevated.',
      'Rotate torso side to side touching medicine ball near hip each turn.'
    ]
  }
];