import {
  bodyCasual,
  bodyShirt,
  bodyTshirt,
  bodyTurtleneck,
  earsStandard,
  eyebrowsThick1,
  eyebrowsThick2,
  eyebrowsThickSad,
  eyebrowsThin,
  eyebrowsThinCurly,
  eyebrowsThinWide,
  eyesBig,
  eyesHuge,
  eyesMedium,
  eyesOval,
  eyesStandard,
  faceDetailsBlushes,
  faceDetailsFreckles,
  faceHairBeard,
  faceHairBigBeard,
  faceHairMustache,
  glassesAviator,
  glassesHarry,
  glassesRound,
  glassesStandard,
  hairBob,
  hairCurly,
  hairCurlyMedium,
  hairElvis,
  hairLong,
  hairLongThick,
  hairLongWavy,
  hairPonyTail,
  hairRapunzel,
  hairShort,
  hairStylish,
  hairThick,
  hairTopKnot,
  headStandard,
  mouthLips1,
  mouthLips2,
  mouthLipsSmile,
  mouthOpen,
  mouthOpenDimples,
  mouthSmile1,
  mouthSmile2,
  mouthSmileOpen,
  mouthSmirk,
  mouthWideOpen,
} from '@avatune/kyute-assets'
import type { VanillaAvatarItem } from '@avatune/types'
import shared from './shared'

export default shared
  .toFramework<VanillaAvatarItem>()
  .withComponents('glasses', {
    aviator: { code: glassesAviator },
    harry: { code: glassesHarry },
    round: { code: glassesRound },
    standard: { code: glassesStandard },
  })
  .withComponents('hair', {
    bob: { code: hairBob },
    curly: { code: hairCurly },
    curlyMedium: { code: hairCurlyMedium },
    elvis: { code: hairElvis },
    long: { code: hairLong },
    longThick: { code: hairLongThick },
    longWavy: { code: hairLongWavy },
    ponyTail: { code: hairPonyTail },
    rapunzel: { code: hairRapunzel },
    short: { code: hairShort },
    stylish: { code: hairStylish },
    thick: { code: hairThick },
    topKnot: { code: hairTopKnot },
  })
  .withComponents('faceDetails', {
    blushes: { code: faceDetailsBlushes },
    freckles: { code: faceDetailsFreckles },
  })
  .withComponents('body', {
    casual: { code: bodyCasual },
    shirt: { code: bodyShirt },
    tshirt: { code: bodyTshirt },
    turtleneck: { code: bodyTurtleneck },
  })
  .withComponents('ears', {
    standard: { code: earsStandard },
  })
  .withComponents('eyes', {
    big: { code: eyesBig },
    huge: { code: eyesHuge },
    medium: { code: eyesMedium },
    oval: { code: eyesOval },
    standard: { code: eyesStandard },
  })
  .withComponents('eyebrows', {
    thick1: { code: eyebrowsThick1 },
    thick2: { code: eyebrowsThick2 },
    thickSad: { code: eyebrowsThickSad },
    thin: { code: eyebrowsThin },
    thinCurly: { code: eyebrowsThinCurly },
    thinWide: { code: eyebrowsThinWide },
  })
  .withComponents('faceHair', {
    beard: { code: faceHairBeard },
    bigBeard: { code: faceHairBigBeard },
    mustache: { code: faceHairMustache },
  })
  .withComponents('head', {
    standard: { code: headStandard },
  })
  .withComponents('mouth', {
    lips1: { code: mouthLips1 },
    lips2: { code: mouthLips2 },
    lipsSmile: { code: mouthLipsSmile },
    open: { code: mouthOpen },
    openDimples: { code: mouthOpenDimples },
    smile1: { code: mouthSmile1 },
    smile2: { code: mouthSmile2 },
    smileOpen: { code: mouthSmileOpen },
    smirk: { code: mouthSmirk },
    wideOpen: { code: mouthWideOpen },
  })
  .build()
