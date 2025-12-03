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
  nosesWomanBig,
  nosesWomanSmall,
  nosesWomanStandard,
} from '@avatune/pawel-olek-assets'
import type { VanillaAvatarItem } from '@avatune/types'
import shared from './shared'

export default shared
  .toFramework<VanillaAvatarItem>()
  .withComponents('ears', {
    womanDropEarrings: { code: earsWomanDropEarrings },
    womanSharp: { code: earsWomanSharp },
    womanStandard: { code: earsWomanStandard },
  })
  .withComponents('eyes', {
    womanBig: { code: eyesWomanBig },
    womanHappy: { code: eyesWomanHappy },
    womanSmall: { code: eyesWomanSmall },
    womanStandard: { code: eyesWomanStandard },
  })
  .withComponents('faceDetails', {
    chinDimple1: { code: faceDetailsChinDimple1 },
    chinDimple2: { code: faceDetailsChinDimple2 },
    chinDimple3: { code: faceDetailsChinDimple3 },
    chinDimple4: { code: faceDetailsChinDimple4 },
  })
  .withComponents('glasses', {
    womanPatch: { code: glassesWomanPatch },
    womanRound: { code: glassesWomanRound },
    womanSquare: { code: glassesWomanSquare },
    womanStylish: { code: glassesWomanStylish },
  })
  .withComponents('hair', {
    womanBob: { code: hairWomanBob },
    womanlong: { code: hairWomanlong },
    womanLowBun: { code: hairWomanLowBun },
    womanMedium: { code: hairWomanMedium },
    womanStickBun: { code: hairWomanStickBun },
  })
  .withComponents('hats', {
    hijab: { code: hairHijab },
  })
  .withComponents('head', {
    womanChin: { code: headWomanChin },
    womanStandard: { code: headWomanStandard },
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
  .withComponents('noses', {
    womanBig: { code: nosesWomanBig },
    womanSmall: { code: nosesWomanSmall },
    womanStandard: { code: nosesWomanStandard },
  })
  .build()
