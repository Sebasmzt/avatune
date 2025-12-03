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
  y: size * percentage('15%'),
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
  .addColors('hats', [AccentColors.Primary])
  .addColors('head', [SkinTones.Light, SkinTones.Dark])
  .addColors('mouth', [AccentColors.Primary])
  .addColors('noses', [AccentColors.Primary])
  // Ears
  .addItem('ears', 'manBig', {
    position: fromHeadOffset(-percentage('8%'), percentage('30%')),
    layer: Layer.Head,
  })
  .addItem('ears', 'manBiten', {
    position: fromHeadOffset(-percentage('9%'), percentage('31%')),
    layer: Layer.Head,
  })
  .addItem('ears', 'manRingEarring', {
    position: fromHeadOffset(-percentage('8%'), percentage('31%')),
    layer: Layer.Head,
  })
  .addItem('ears', 'manSmall', {
    position: fromHeadOffset(-percentage('8%'), percentage('31%')),
    layer: Layer.Head,
  })
  .addItem('ears', 'manStandard', {
    position: fromHeadOffset(-percentage('8%'), percentage('31%')),
    layer: Layer.Head,
  })
  .addItem('ears', 'manStudEarrings', {
    position: fromHeadOffset(-percentage('8%'), percentage('30%')),
    layer: Layer.Head,
  })
  // Eyes
  .addItem('eyes', 'manBig', {
    position: fromHeadOffset(percentage('10%'), percentage('30%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'manHappy', {
    position: fromHeadOffset(percentage('10%'), percentage('30%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'manSmall', {
    position: fromHeadOffset(percentage('10%'), percentage('30%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'manStandard', {
    position: fromHeadOffset(percentage('10%'), percentage('30%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'manEyelashes', {
    position: fromHeadOffset(percentage('8.5%'), percentage('29%')),
    layer: Layer.Eyes,
  })
  .addItem('eyes', 'manEyelids', {
    position: fromHeadOffset(percentage('8.5%'), percentage('30%')),
    layer: Layer.Eyes,
  })
  // FaceDetails
  .addItem('faceDetails', 'chinDimple1', {
    position: fromHeadOffset(percentage('1%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple2', {
    position: fromHeadOffset(percentage('1%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple3', {
    position: fromHeadOffset(percentage('1%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .addItem('faceDetails', 'chinDimple4', {
    position: fromHeadOffset(percentage('1%'), percentage('42%')),
    layer: Layer.Eyes,
  })
  .setOptional('faceDetails')
  // Glasses
  .addItem('glasses', 'manBrow', {
    position: fromHeadOffset(-percentage('1%'), percentage('25%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'manPatch', {
    position: fromHeadOffset(-percentage('1%'), percentage('26%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'manRound', {
    position: fromHeadOffset(-percentage('1%'), percentage('27%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'manSquare', {
    position: fromHeadOffset(-percentage('1%'), percentage('27%')),
    layer: Layer.Accessories,
  })
  .addItem('glasses', 'manStylish', {
    position: fromHeadOffset(-percentage('1%'), percentage('28%')),
    layer: Layer.Accessories,
  })
  .setOptional('glasses')
  // Hair
  .addItem('hair', 'manBald', {
    position: fromHeadOffset(-percentage('5%'), -percentage('10.5%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manCurly', {
    position: fromHeadOffset(-percentage('5%'), -percentage('10%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manElvis', {
    position: fromHeadOffset(-percentage('5%'), -percentage('12%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manMediumTopknot', {
    position: fromHeadOffset(-percentage('5%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manMessy', {
    position: fromHeadOffset(-percentage('5%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manShortTopknot', {
    position: fromHeadOffset(-percentage('5%'), -percentage('11%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'manStylish', {
    position: fromHeadOffset(-percentage('5%'), -percentage('14%')),
    layer: Layer.Hair,
  })
  .addItem('hair', 'beanie', {
    position: fromHeadOffset(-percentage('4%'), -percentage('12%')),
    layer: Layer.Accessories,
  })
  // Head
  .addItem('head', 'manBeardMustache', {
    position: fromHeadOffset(-percentage('1%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manBeardSharp', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manBeardSlim', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manBeardStandard', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manBristle', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manBristleMustache', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manChin', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manSharp', {
    position: fromHeadOffset(percentage('0%'), percentage('2%')),
    layer: Layer.Head,
  })
  .addItem('head', 'manStandard', {
    position: fromHeadOffset(percentage('0%'), percentage('0%')),
    layer: Layer.Head,
  })
  // Mouth
  .addItem('mouth', 'chin', {
    position: fromHeadOffset(percentage('18%'), percentage('51%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'philtrum1', {
    position: fromHeadOffset(percentage('18%'), percentage('51%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'philtrum2', {
    position: fromHeadOffset(percentage('17.25%'), percentage('51%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'sad', {
    position: fromHeadOffset(percentage('18.5%'), percentage('53%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'small', {
    position: fromHeadOffset(percentage('18.5%'), percentage('53%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'smile', {
    position: fromHeadOffset(percentage('18.25%'), percentage('53%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'tongue1', {
    position: fromHeadOffset(percentage('18.25%'), percentage('51%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'tongue2', {
    position: fromHeadOffset(percentage('18.375%'), percentage('51%')),
    layer: Layer.Mouth,
  })
  .addItem('mouth', 'vampire', {
    position: fromHeadOffset(percentage('17%'), percentage('52%')),
    layer: Layer.Mouth,
  })
  // Noses
  .addItem('noses', 'manBig', {
    position: fromHeadOffset(percentage('19%'), percentage('33%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'manBigWide', {
    position: fromHeadOffset(percentage('19%'), percentage('33%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'manSmall', {
    position: fromHeadOffset(percentage('19%'), percentage('33%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'manStandard', {
    position: fromHeadOffset(percentage('20%'), percentage('33%')),
    layer: Layer.Mouth,
  })
  .addItem('noses', 'manWide', {
    position: fromHeadOffset(percentage('18.5%'), percentage('33%')),
    layer: Layer.Mouth,
  })
