import { createTheme, fromHead } from '@avatune/theme-builder'
import type { BaseAvatarItem } from '@avatune/types'
import { percentage } from '@avatune/utils'
import { AccentColors, BackgroundColors, HairColors, SkinTones } from './colors'

export enum Layer {
  Background = 0,
  Head = 10,
  Body = 20,
  Hair = 30,
  Eyes = 40,
  Eyebrows = 41,
  Mouth = 50,
  Accessories = 60,
}

const getHeadPosition = (size: number) => ({
  x: size * percentage('26%'),
  y: size * percentage('18%'),
})

const fromHeadOffset = fromHead(getHeadPosition)

export default createTheme<BaseAvatarItem>()
  .withStyle({
    size: 400,
    borderRadius: '100%',
    borderWidth: 2,
    borderColor: AccentColors.Primary,
  })
  .addColors('background', [BackgroundColors.Default])
  .addColors('ears', [SkinTones.Light, SkinTones.Dark])
  .addColors('eyes', [AccentColors.Primary])
  .addColors('faceDetails', [AccentColors.Primary])
  .addColors('glasses', [AccentColors.Primary])
  .addColors('hair', [HairColors.Black])
  .addColors('head', [SkinTones.Light, SkinTones.Dark])
  .addColors('mouth', [AccentColors.Primary])
  .addColors('noses', [AccentColors.Primary])
  // Ears
  .addItem('ears', 'womanDropEarrings', {
    position: fromHeadOffset(-percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  .addItem('ears', 'womanSharp', {
    position: fromHeadOffset(-percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  .addItem('ears', 'womanStandard', {
    position: fromHeadOffset(-percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  // Eyes
  .addItem('eyes', 'womanBig', {
    position: fromHeadOffset(percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'womanHappy', {
    position: fromHeadOffset(percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'womanSmall', {
    position: fromHeadOffset(percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'womanStandard', {
    position: fromHeadOffset(percentage('9%'), percentage('27%')),
    layer: Layer.Eyes,
  })
  // FaceDetails
  .addItem('faceDetails', 'chinDimple1', {
    position: fromHeadOffset(percentage('0%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple2', {
    position: fromHeadOffset(percentage('0%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple3', {
    position: fromHeadOffset(percentage('0%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple4', {
    position: fromHeadOffset(percentage('0%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  // Glasses
  .addItem('glasses', 'womanPatch', {
    position: fromHeadOffset(percentage('0%'), percentage('25%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'womanRound', {
    position: fromHeadOffset(-percentage('1.25%'), percentage('25%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'womanSquare', {
    position: fromHeadOffset(-percentage('1.25%'), percentage('25%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'womanStylish', {
    position: fromHeadOffset(-percentage('1.25%'), percentage('25%')),
    layer: Layer.Accessories,
  })
  // Hair
  .addItem('hair', 'womanBob', {
    position: fromHeadOffset(-percentage('6%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'womanlong', {
    position: fromHeadOffset(-percentage('10%'), -percentage('14%')),
    layer: Layer.Eyes,
  })
  .addItem('hair', 'womanLowBun', {
    position: fromHeadOffset(-percentage('6%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'womanMedium', {
    position: fromHeadOffset(-percentage('10%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'womanStickBun', {
    position: fromHeadOffset(-percentage('6%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'hijab', {
    position: fromHeadOffset(-percentage('10%'), -percentage('14%')),
    layer: Layer.Accessories,
  })
  // Head
  .addItem('head', 'womanChin', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'womanStandard', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  // Mouth
  .addItem('mouth', 'chin', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'philtrum1', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'philtrum2', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'sad', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'small', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'smile', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'tongue1', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'tongue2', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'vampire', {
    position: fromHeadOffset(percentage('17.5%'), percentage('49%')),
    layer: Layer.Mouth,
  })
  // Noses
  .addItem('noses', 'womanBig', {
    position: fromHeadOffset(percentage('20%'), percentage('31%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'womanSmall', {
    position: fromHeadOffset(percentage('20%'), percentage('31%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'womanStandard', {
    position: fromHeadOffset(percentage('20%'), percentage('31%')),
    layer: Layer.Mouth,
  })
