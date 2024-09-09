import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnInit(): void {
        const linkColor = document.querySelectorAll('.nav-link');
        linkColor.forEach(link => {
          if(window.location.href.endsWith(link.getAttribute('href') || '')){
            link.classList.add('active');
          }
          link.addEventListener('click', () => {
            linkColor.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          });
        })
    }

}
