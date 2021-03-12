import { Injectable } from "@angular/core";
import { ClienteInterface } from '../../interfaces/cliente.interface';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ClienteService } from '../../services/cliente.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ClienteResolver implements Resolve<ClienteInterface> {
    constructor(private clienteService: ClienteService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClienteInterface> {
        const id = route.params['id'];
        // otra forma de acceder a los parámetros de la url
        const accion = route.paramMap.get('accion');
        // Validación
        if (isNaN(id)) {
            console.log(`Número de cliante inválido ${id}`);
            this.router.navigateByUrl('/clientes/clientes');
            return null;
        }
        return this.clienteService.getCliente(+id)
        .pipe(
            tap( (info: ClienteInterface) => {
                if (info) { return info; }
            }),
            catchError(error => throwError(error || 'Server Error'))
        );
    }


}




