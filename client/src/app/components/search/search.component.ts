import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchCriteria?: ElementRef

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    doSearch(value: string){
      console.log(`value=${value}`);
      this.router.navigateByUrl(`/search/${value}`)
    }

    doReset(){
      if (this.searchCriteria) this.searchCriteria.nativeElement.value = ''
      this.router.navigateByUrl(`/search/`)
    }

}
