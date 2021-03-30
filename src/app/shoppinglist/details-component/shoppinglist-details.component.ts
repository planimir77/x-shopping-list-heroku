import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService, ShoppinglistService } from 'src/app/core/services';
import { IItem, IShoppinglist, IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styleUrls: ['./shoppinglist-details.component.scss']
})
export class ShoppinglistDetailsComponent implements OnInit {

  @Input() shoppinglist: IShoppinglist = null;
  @Input() items: IItem[] = null;
  @ViewChild('tabGroup') tabGroup;
  @ViewChild('bubbleCopy') bubbleCopy: ElementRef;
  @ViewChild('bubbleEmail') bubbleEmail: ElementRef;
  @ViewChild('bubbleViber') bubbleViber: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDone: boolean = false;
  subscribedItems: boolean;
  currentUser: IUser;
  hrefViber: string;
  hrefEmail: string;
  url: string;
  touchStartY: number;
  touchStartX: number;
  touchEndY: number;
  touchEndX: number;


  constructor(
    private shoppinglistService: ShoppinglistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.update();

    this.authService.currentUser$.subscribe(currentUser =>
      this.currentUser = currentUser);
  }
  update(): void {
    const shoppinglistId = this.activatedRoute.snapshot.params.id;

    this.shoppinglistService.loadShoppinglist(shoppinglistId)
      .subscribe(
        shoppinglist => {
          this.items = shoppinglist.items;
          this.shoppinglist = shoppinglist;
          this.url = window.location.href;
          this.hrefViber = `viber://forward?text=${window.location.href}`;
          this.hrefEmail = `mailto:example@email.com?subject=${this.shoppinglist.shoppinglistName}&body=${window.location.href}`;
          if (!shoppinglist) {
            return this.router.navigate(['/']);
          }

          this.setTitle(this.shoppinglist.shoppinglistName);
        },
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/user/login');
          } else {
            this.router.navigateByUrl('/error-page');
          }
        }
      );
  }

  /**
   * Set the title according to the current shoppinglist name
   * @param shoppinglistName 
   */
  setTitle(shoppinglistName: string): void {
    const currentTitle = this.titleService.getTitle();
    this.titleService.setTitle(currentTitle.replace('XShoppingList', shoppinglistName));
  }

  onItemAdded(item: IItem): void {
    this.items.push(item);
  }

  onItemChange(newItem: any): void {
    const index = this.getItemIndex(newItem._id);

    this.items.splice(index, 1, newItem);

    this.setSubscribedItems();
    this.setIsDone();
  }

  onItemRemove(itemId: string): void {
    const index = this.getItemIndex(itemId);

    this.items.splice(index, 1);
  }

  getItemIndex(itemId: string): number {
    const item = this.items.find(item => item._id === itemId);
    return this.items.indexOf(item);
  }

  setIsDone(): void {
    const secondTabSelected = this.tabGroup.selectedIndex === 1;

    this.isDone = secondTabSelected && !(this.subscribedItems);
  }

  onTabGroupClicked(tab: MatTabChangeEvent): void {
    // Check shopping list completed
    if (tab.index !== 1) {
      setTimeout(() => this.isDone = false, 600);
    }
    // Shop tab clicked
    if (tab.index === 1) {
      this.setSubscribedItems();
    }
    // Share tab clicked
    if (tab.index === 2) {
      setTimeout(() => {
        const bubblesToShow = [
          this.bubbleCopy, this.bubbleEmail, this.bubbleViber
        ];
        const source = timer(1000, 3000);
        source
          .pipe(take(bubblesToShow.length))
          .subscribe(val => {
            this.bubbleShow(bubblesToShow[val]);
          });
      }, 500);
    }
  }

  bubbleShow(bubble: ElementRef<any>): void {
    bubble.nativeElement.style.visibility = 'visible';
    setTimeout(() => {
      bubble.nativeElement.style.visibility = 'hidden';
    }, 2000);
  }

  setSubscribedItems(): void {
    this.subscribedItems = this.items?.some(item => item.subscribers.includes(this.shoppinglist._id));
  }

  isOwner(): boolean {
    const result = this.currentUser?._id === this.shoppinglist.userId;

    return result;
  }

  copyToClipboard() {
    this.bubbleCopy.nativeElement.style.visibility = 'hidden';

    this.snackBar.open("Shopping list address copied to clipboard", "", {
      duration: 3000,
      panelClass: "warning",
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  setBubblePosition(parentWidth, bubbleWidth) {
    if (parentWidth === 0 || bubbleWidth === 0) {
      return {};
    } else {
      const value = (parentWidth - bubbleWidth) / 2;
      return { left: `${value}px` };
    }
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }
  onTouchEnd(event: TouchEvent): void {
    if (!this.touchStartY) {
      return;
    }

    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;

    if (
      Math.abs(this.touchStartY - this.touchEndY) < 70 
      && 
      Math.abs(this.touchStartX - this.touchEndX) > 5) {

      const currentIndex = this.tabGroup.selectedIndex;

      if (this.touchStartX > this.touchEndX) {
        this.tabGroup.selectedIndex = (currentIndex + 1);
      } else {
        try {
          
          this.tabGroup.selectedIndex = (currentIndex - 1);
        } catch (error) {
          alert(error);
        }
      }
    }

  }
}
