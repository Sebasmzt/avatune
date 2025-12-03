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
} from '@avatune/pawel-olek-assets/svelte'
import type { SvelteAvatarItem } from '@avatune/types'
import shared from './shared'

export default shared
  .toFramework<SvelteAvatarItem>()
  .withComponents('ears', {
    womanDropEarrings: { Component: EarsWomanDropEarrings },
    womanSharp: { Component: EarsWomanSharp },
    womanStandard: { Component: EarsWomanStandard },
  })
  .withComponents('eyes', {
    womanBig: { Component: EyesWomanBig },
    womanHappy: { Component: EyesWomanHappy },
    womanSmall: { Component: EyesWomanSmall },
    womanStandard: { Component: EyesWomanStandard },
  })
  .withComponents('faceDetails', {
    chinDimple1: { Component: FaceDetailsChinDimple1 },
    chinDimple2: { Component: FaceDetailsChinDimple2 },
    chinDimple3: { Component: FaceDetailsChinDimple3 },
    chinDimple4: { Component: FaceDetailsChinDimple4 },
  })
  .withComponents('glasses', {
    womanPatch: { Component: GlassesWomanPatch },
    womanRound: { Component: GlassesWomanRound },
    womanSquare: { Component: GlassesWomanSquare },
    womanStylish: { Component: GlassesWomanStylish },
  })
  .withComponents('hair', {
    womanBob: { Component: HairWomanBob },
    womanlong: { Component: HairWomanlong },
    womanLowBun: { Component: HairWomanLowBun },
    womanMedium: { Component: HairWomanMedium },
    womanStickBun: { Component: HairWomanStickBun },
    hijab: { Component: HairHijab },
  })
  .withComponents('head', {
    womanChin: { Component: HeadWomanChin },
    womanStandard: { Component: HeadWomanStandard },
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
    womanBig: { Component: NosesWomanBig },
    womanSmall: { Component: NosesWomanSmall },
    womanStandard: { Component: NosesWomanStandard },
  })
  .build()
