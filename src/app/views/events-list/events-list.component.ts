import { Component } from '@angular/core';
import { sportsTypesList, statusesTypesList } from 'src/app/constants';
import { Event, EventsResponse } from 'src/app/models/Event';
import { Sports } from 'src/app/models/Sports';
import { Status } from 'src/app/models/Status';
import { EventsService, OrderBy } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent {
  events: Event[] = [];
  loading: boolean = false;
  totalPages: number = 1;
  paginationItems: number[] = [10, 20, 50];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  sportsItems: Sports[] = sportsTypesList;
  statusesItems: Status[] = statusesTypesList;
  orderBy: OrderBy = 'startTimeAsc';
  private _selectedSportsItems: string[] = sportsTypesList.map((i) => i.value);
  private _selectedStatusesItems: string[] = statusesTypesList.map(
    (i) => i.value
  );
  private _search: string = '';

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.loading = true;
    this.eventsService
      .getEvents(
        this.currentPage,
        this.itemsPerPage,
        this.orderBy,
        this.search,
        this.selectedStatusesItems,
        this.selectedSportsItems
      )
      .subscribe(
        (response: EventsResponse) => {
          this.loading = false;
          this.events = response.events || [];
          this.totalPages = response.totalPages;
        },
        (err) => {
          console.error(err);
          this.loading = false;
        }
      );
  }

  changePageNumber(increment: boolean = true) {
    this.currentPage = increment ? this.currentPage + 1 : this.currentPage - 1;
    this.getEvents();
  }

  changeSorting(timeType: 'start' | 'finish'): void {
    if (timeType === 'start') {
      this.orderBy =
        this.orderBy === 'startTimeAsc' ? 'startTimeDesc' : 'startTimeAsc';
    } else {
      this.orderBy =
        this.orderBy === 'finishTimeAsc' ? 'finishTimeDesc' : 'finishTimeAsc';
    }
    this.getEvents();
  }

  toggleSport(sport: Sports): void {
    let copyArray = [...this.selectedSportsItems];
    let indexOfSport = copyArray.findIndex((item) => item == sport.value);
    if (indexOfSport > -1) {
      copyArray.splice(indexOfSport, 1);
    } else {
      copyArray.push(sport.value);
    }
    this.selectedSportsItems = copyArray;
  }

  toggleStatus(status: Status) {
    let copyArray = [...this.selectedStatusesItems];
    let indexOfStatus = copyArray.findIndex((item) => item == status.value);
    if (indexOfStatus > -1) {
      copyArray.splice(indexOfStatus, 1);
    } else {
      copyArray.push(status.value);
    }
    this.selectedStatusesItems = copyArray;
  }

  changeStatus(
    event: Event,
    newStatus: 'inactive' | 'active' | 'finished'
  ): void {
    if (event.status !== 'finished') {
      event.status = newStatus;
      this.eventsService.updateEvent(event).subscribe();
    }
  }

  //START Functions for frontend filtering and sorting
  // get filteredEvents(): Event[] {
  //   let filteredItems = this.events.filter(
  //     (event) =>
  //       this.selectedSportsItems.includes(event.sport) &&
  //       this.selectedStatusesItems.includes(event.status) &&
  //       (this.search.length < 3 ||
  //         event.name
  //           .toLowerCase()
  //           .trim()
  //           .includes(this.search.toLowerCase().trim()))
  //   );
  //   let propertyToSort: 'startTime' | 'finishTime' = [
  //     'startTimeAsc',
  //     'startTimeDesc',
  //   ].includes(this.orderBy)
  //     ? 'startTime'
  //     : 'finishTime';
  //   let isAscending: boolean = ['startTimeAsc', 'finishTimeAsc'].includes(
  //     this.orderBy
  //   );
  //   if (isAscending) {
  //     filteredItems.sort(
  //       (a, b) =>
  //         new Date(a[propertyToSort]).getTime() -
  //         new Date(b[propertyToSort]).getTime()
  //     );
  //   } else {
  //     filteredItems.sort(
  //       (a, b) =>
  //         new Date(b[propertyToSort]).getTime() -
  //         new Date(a[propertyToSort]).getTime()
  //     );
  //   }

  //   return filteredItems;
  // }
  // get paginatedEvents(): Event[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = Number(startIndex) + Number(this.itemsPerPage);
  //   return this.events.slice(startIndex, endIndex);
  // }
  // get showNext(): boolean {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = Number(startIndex) + Number(this.itemsPerPage);
  //   return endIndex < this.filteredEvents.length;
  // }
  //END Functions for frontend filtering and sorting

  //START Listening for filters changes to restore currentPage
  get selectedSportsItems(): string[] {
    return this._selectedSportsItems;
  }
  set selectedSportsItems(newItems: string[]) {
    this._selectedSportsItems = newItems;
    this.currentPage = 1;
    this.getEvents();
  }
  get selectedStatusesItems(): string[] {
    return this._selectedStatusesItems;
  }
  set selectedStatusesItems(newItems: string[]) {
    this._selectedStatusesItems = newItems;
    this.currentPage = 1;
    this.getEvents();
  }
  get search(): string {
    return this._search;
  }
  set search(newSearchText: string) {
    let wasSearchActive: boolean = this._search.length >= 3;
    let isSearchActive: boolean = newSearchText.length >= 3;
    if (!(!wasSearchActive && !isSearchActive)) {
      this.currentPage = 1;
    }
    this._search = newSearchText;
    this.getEvents();
  }
  //END Listening for filters changes to restore currentPage
}
