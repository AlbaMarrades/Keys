import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Token } from '../../infraestructure/token';

@Directive({
  selector: '[RoleRequired]'
})

export class RoleRequiredDirective {

  @Input() set RoleRequired(roles: string[]) {
    const roleToken: string = Token.getRole()
    if (roles.includes(roleToken)) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {

  }
}
