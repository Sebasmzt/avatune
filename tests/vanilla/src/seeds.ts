/**
 * 25 diverse seed phrases for deterministic avatar generation
 * Ensures visual diversity across emails, names, UUIDs, usernames, and edge cases
 */
export const SEEDS = [
  // Emails (8)
  'alice.wonder@example.com',
  'bob.builder@test.io',
  'charlie.chaplin@demo.org',
  'diana.prince@avatune.dev',
  'eve.gardner@company.co',
  'frank.ocean@music.fm',
  'grace.hopper@tech.edu',
  'henry.ford@auto.com',

  // Full names (8)
  'John Michael Smith',
  'Maria Garcia Rodriguez',
  'Wei Chen Zhang',
  'Fatima Hassan Ahmed',
  'Raj Kumar Patel',
  'Sofia Andersson Nilsson',
  'Yuki Tanaka Sato',
  'Isabella Rossi Bianchi',

  // UUIDs (4)
  '550e8400-e29b-41d4-a716-446655440000',
  'a3bb189e-8bf9-3888-9912-ace4e6543002',
  'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd',
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',

  // Usernames (3)
  'user_1337_pro',
  'test-account-42',
  'avatar.creator.99',

  // Edge cases (2)
  '12345',
  'Àéïøü-unicode-test',
] as const
