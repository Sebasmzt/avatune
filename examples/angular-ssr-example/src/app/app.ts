import { Component } from '@angular/core'
import { Avatar } from '@avatune/angular'
import theme from '@avatune/pacovqzz-theme/angular'

@Component({
  selector: 'app-root',
  imports: [Avatar],
  template: `
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 3rem; padding: 2rem">
      @for (seed of seeds; track seed) {
        <avatune-avatar [theme]="theme" [inputSize]="64" [seed]="seed" />
      }
    </div>
  `,
  styles: [],
})
export class App {
  protected readonly theme = theme
  protected readonly seeds = ['angular-ssr-1', 'angular-ssr-2', 'angular-ssr-3', 'angular-ssr-4', 'angular-ssr-5']
}
