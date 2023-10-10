import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reprentative-main-card',
  templateUrl: './reprentative-main-card.component.html',
  styleUrls: ['./reprentative-main-card.component.scss']
})
export class ReprentativeMainCardComponent {
  @Input() requests: any
}
