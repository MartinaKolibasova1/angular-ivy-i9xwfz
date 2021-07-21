import { Component, VERSION, HostListener, AfterViewInit } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  names = [
    'amelia',
    'anna',
    'aladar',
    'bozidara',
    'blanka',
    'daniel',
    'emil',
    'flak',
    'gusto',
    'helena',
    'iva',
    'ja',
    'krt'
  ];

  maxId: string;

  ngAfterViewInit(): void {
    this.getMax();
  }

  getFirstOnes(): string[] {
    const firstLetters = this.names.map(name => name[0]);
    return this.toUniqueArray(firstLetters);
  }

  getNames(letter: string): string[] {
    return this.names.filter(name1 => name1.startsWith(letter));
  }

  scrollIntoView1(letter: string): void {
    const el = document.getElementById(letter);
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  toUniqueArray(a) {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
      if (newArr.indexOf(a[i]) === -1) {
        newArr.push(a[i]);
      }
    }
    return newArr;
  }

  isTheFirst(name: string): boolean {
    const first = this.names.filter(name1 => name1.startsWith(name[0]))[0];
    return first === name;
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    this.getMax();
  }

  getMax(): void {
    const ids = this.getFirstOnes();
    const idsMap = {};
    ids.forEach(id => {
      const box = document.getElementById(id);
      const rect = box.getBoundingClientRect();
      idsMap[id] = rect.top;
    });

    if(Object.keys(idsMap).find(key => idsMap[key] === 0))
      this.maxId = Object.keys(idsMap).find(key => idsMap[key] === 0)
    else 
      this.maxId = Object.keys(idsMap).reduce((a, b) =>
      Math.abs(idsMap[a]) <  Math.abs(idsMap[b]) ? a : b
      );   

    console.log(idsMap);
  }

  isTopInTheScreen(id: string): boolean {
    return 'scroll' + this.maxId === id;
  }
}
