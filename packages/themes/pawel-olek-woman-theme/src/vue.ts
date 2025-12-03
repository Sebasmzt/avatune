import {
  EarsWomanDropEarrings,
  EarsWomanSharp,
  EarsWomanStandard,
  EyesWomanBig,
  EyesWomanHappy,
  EyesWomanSmall,
  EyesWomanStandard,
  FaceDetailsChinDimple1,
  FaceDetailsChinDimple2,
  FaceDetailsChinDimple3,
  FaceDetailsChinDimple4,
  GlassesWomanPatch,
  GlassesWomanRound,
  GlassesWomanSquare,
  GlassesWomanStylish,
  HairHijab,
  HairWomanBob,
  HairWomanLowBun,
  HairWomanlong,
  HairWomanMedium,
  HairWomanStickBun,
  HeadWomanChin,
  HeadWomanStandard,
  MouthChin,
  MouthPhiltrum1,
  MouthPhiltrum2,
  MouthSad,
  MouthSmall,
  MouthSmile,
  MouthTongue1,
  MouthTongue2,
  MouthVampire,
  NosesWomanBig,
  NosesWomanSmall,
  NosesWomanStandard,
} from '@avatune/pawel-olek-assets/vue'
import type { VueAvatarItem } from '@avatune/types'
import shared from './shared'

export default shared
  .toFramework<VueAvatarItem>()
  .withComponents('ears', {
    dropEarrings: { Component: EarsWomanDropEarrings },
    sharp: { Component: EarsWomanSharp },
    standard: { Component: EarsWomanStandard },
  })
  .withComponents('eyes', {
    big: { Component: EyesWomanBig },
    happy: { Component: EyesWomanHappy },
    small: { Component: EyesWomanSmall },
    standard: { Component: EyesWomanStandard },
  })
  .withComponents('faceDetails', {
    chinDimple1: { Component: FaceDetailsChinDimple1 },
    chinDimple2: { Component: FaceDetailsChinDimple2 },
    chinDimple3: { Component: FaceDetailsChinDimple3 },
    chinDimple4: { Component: FaceDetailsChinDimple4 },
  })
  .withComponents('glasses', {
    patch: { Component: GlassesWomanPatch },
    round: { Component: GlassesWomanRound },
    square: { Component: GlassesWomanSquare },
    stylish: { Component: GlassesWomanStylish },
  })
  .withComponents('hair', {
    bob: { Component: HairWomanBob },
    long: { Component: HairWomanlong },
    lowBun: { Component: HairWomanLowBun },
    medium: { Component: HairWomanMedium },
    stickBun: { Component: HairWomanStickBun },
    hijab: { Component: HairHijab },
  })
  .withComponents('head', {
    chin: { Component: HeadWomanChin },
    standard: { Component: HeadWomanStandard },
  })
  .withComponents('mouth', {
    chin: { Component: MouthChin },
    philtrum1: { Component: MouthPhiltrum1 },
    philtrum2: { Component: MouthPhiltrum2 },
    sad: { Component: MouthSad },
    small: { Component: MouthSmall },
    smile: { Component: MouthSmile },
    tongue1: { Component: MouthTongue1 },
    tongue2: { Component: MouthTongue2 },
    vampire: { Component: MouthVampire },
  })
  .withComponents('noses', {
    big: { Component: NosesWomanBig },
    small: { Component: NosesWomanSmall },
    standard: { Component: NosesWomanStandard },
  })
  .build()
