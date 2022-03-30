import { Component, OnInit } from '@angular/core';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
@Component({
  selector: 'il-onboarding-container',
  templateUrl: './onboarding-container.component.html'
})
export class OnboardingContainerComponent extends GenericContainer {
  constructor() {
    super();
  }
}
