import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { AuthService, ShoppinglistService } from './core/services';
import { COOKIE_MESSAGE, I_AGREE } from 'src/app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './shared/components/info/info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser;
  isLogged$ = this.authService.isLogged$;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  cookieMessage: string;
  cookieDismiss: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private shoppinglistService: ShoppinglistService,
    public dialog: MatDialog,
  ) {
    this.cookieMessage = COOKIE_MESSAGE;
    this.cookieDismiss = I_AGREE
  }

  ngOnInit(): void {

    const cc = window as any;
    cc.cookieconsent?.initialise({
      palette: {
        popup: {
          background: "#673ab7",
        },
        button: {
          background: "#ffe000",
          text: "#164969"
        }
      },
      theme: "classic",
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
      }
    });

    this.authService.currentUser$.subscribe(currentUser =>
      this.currentUser = currentUser);
    
    // Get the title of the current HTML document
    const appTitle = this.titleService.getTitle();
    
    // Set the title according to the current route 
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const childRoute = this.activatedRoute.snapshot.firstChild;
          const currentRouteTitle = this.getRouteTitle(childRoute);
          
          return currentRouteTitle;
        })
      ).subscribe((routeTitle: string) => {
        this.titleService.setTitle([appTitle, routeTitle].join(' '));
      });
  }

  logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }

  /**
   * Get the title according to the current route
   * @param childRoute
   */
  getRouteTitle(childRoute: ActivatedRouteSnapshot) : string {
    const firstChild = childRoute.firstChild;
    if(!firstChild){ 
      return "";
    }
    if (firstChild.data.title) {
      return firstChild.data.title;
    } else {
      return "" + this.getRouteTitle(childRoute.firstChild);
    }
  }
  routeToFavorite(){
    // call service to get favorite
    this.shoppinglistService.getFavoriteShoppinglist().subscribe({
      next: (favorite) => {
        if (favorite) {
          this.router.navigate(["/shoppinglist/", favorite._id]);
        }else {
          const dialogRef = this.dialog.open(InfoComponent,{
            panelClass: 'dialog-container-info',
            width: '340px',
            data: { 
              info: 'You have not selected a favorite shopping list yet',
              user: this.currentUser?.username,
            }
          });
        }
      }
    });
  }
}
