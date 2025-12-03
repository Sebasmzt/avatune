import {
  earsWomanDropEarrings,
  earsWomanSharp,
  earsWomanStandard,
  eyesWomanBig,
  eyesWomanHappy,
  eyesWomanSmall,
  eyesWomanStandard,
  faceDetailsChinDimple1,
  faceDetailsChinDimple2,
  faceDetailsChinDimple3,
  faceDetailsChinDimple4,
  glassesWomanPatch,
  glassesWomanRound,
  glassesWomanSquare,
  glassesWomanStylish,
  hairHijab,
  hairWomanBob,
  hairWomanLowBun,
  hairWomanlong,
  hairWomanMedium,
  hairWomanStickBun,
  headWomanChin,
  headWomanStandard,
  mouthChin,
  mouthPhiltrum1,
  mouthPhiltrum2,
  mouthSad,
  mouthSmall,
  mouthSmile,
  mouthTongue1,
  mouthTongue2,
  mouthVampire,
  noseWomanBig,
  noseWomanSmall,
  noseWomanStandard,
} from '@avatune/pawel-olek-assets'
import type { VanillaAvatarItem } from '@avatune/types'
import shared from './shared'

export default shared
  .toFramework<VanillaAvatarItem>()
  .withComponents('ears', {
    dropEarrings: { code: earsWomanDropEarrings },
    sharp: { code: earsWomanSharp },
    standard: { code: earsWomanStandard },
  })
  .withComponents('eyes', {
    big: { code: eyesWomanBig },
    happy: { code: eyesWomanHappy },
    small: { code: eyesWomanSmall },
    standard: { code: eyesWomanStandard },
  })
  .withComponents('faceDetails', {
    chinDimple1: { code: faceDetailsChinDimple1 },
    chinDimple2: { code: faceDetailsChinDimple2 },
    chinDimple3: { code: faceDetailsChinDimple3 },
    chinDimple4: { code: faceDetailsChinDimple4 },
  })
  .withComponents('glasses', {
    patch: { code: glassesWomanPatch },
    round: { code: glassesWomanRound },
    square: { code: glassesWomanSquare },
    stylish: { code: glassesWomanStylish },
  })
  .withComponents('hair', {
    bob: { code: hairWomanBob },
    long: { code: hairWomanlong },
    lowBun: { code: hairWomanLowBun },
    medium: { code: hairWomanMedium },
    stickBun: { code: hairWomanStickBun },
    hijab: { code: hairHijab },
  })
  .withComponents('head', {
    chin: { code: headWomanChin },
    standard: { code: headWomanStandard },
  })
  .withComponents('mouth', {
    chin: { code: mouthChin },
    philtrum1: { code: mouthPhiltrum1 },
    philtrum2: { code: mouthPhiltrum2 },
    sad: { code: mouthSad },
    small: { code: mouthSmall },
    smile: { code: mouthSmile },
    tongue1: { code: mouthTongue1 },
    tongue2: { code: mouthTongue2 },
    vampire: { code: mouthVampire },
  })
  .withComponents('nose', {
    big: { code: noseWomanBig },
    small: { code: noseWomanSmall },
    standard: { code: noseWomanStandard },
  })
  .build()
