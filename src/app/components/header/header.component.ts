import { Component } from '@angular/core';

interface HeaderItem {
  path: string,
  text: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  headerItems: HeaderItem[] = [
    { path: "/events", text: "Events List" },
    { path: "/events/create", text: "Add Event" }
  ]
}
