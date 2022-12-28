import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from, Observable, of, fromEvent, interval, pipe, debounce, debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-operator',
  templateUrl: './rxjs-operator.component.html',
  styleUrls: ['./rxjs-operator.component.css']
})
export class RxjsOperatorComponent implements OnInit {
  searchForm!:FormGroup;

  //of
  /* of operator is use to make observables from a string ,array or an obj */

  userArr: string[] = ['salman', 'faris', 'a'];//with array
  usersArr: Observable<string[]> = of(this.userArr)

  user: Observable<string> = of('salman');//with string

  userObj = {//with obj
    id: 1,
    name: 'abc',
    job: 'developer',
    adult: true
  }

  userobj: Observable<any> = of(this.userObj)


  //from
  /* will create an observable from array,array like obj,a promise ,an iterable obj and an obsrvable like obj*/
  store: Observable<string> = from(['grocery', 'vegetable', 'fruits']);


  //fromEvent

  @ViewChild('valiadte') validate!: ElementRef;

  constructor(private formBuilder:FormBuilder) { }
  ngOnInit(): void {

this.searchForm=new FormGroup({
  name:new FormControl('start search')
})

this.searchForm.get('name')?.valueChanges
    .pipe(
      take(2),// take 2 values
      debounceTime(3000)// time lag before it emits next value

    ).subscribe(data=>{
      console.log(data);
      
    })

    //of
    this.usersArr.subscribe(data => {
      console.log(data);
    })

    this.user.subscribe(data => {
      console.log(data);
    })
    this.userobj.subscribe(data => {
      console.log(data);
    })


    //from
    this.store.subscribe(data => {
      console.log(data);
    })


    //interval
    this.usersArr.subscribe(data => {
      let interval$ = interval(500)//using $ with observable is a gud practice that the varuable is a observable
      interval$.subscribe(num => {
        if (num < 10) {
          console.log(data, num);
        }

      })

      interval$.subscribe(num=>{
        if(num<8){
          console.log('kkkkk');  
        }
      })

    })


  }

  //fromEVent
  rxjsEventObser() {
    let btnObsrv = fromEvent(this.validate?.nativeElement, 'mouseover');

    btnObsrv.subscribe(data => {
      console.log(data);

    })
  }

  //debounce time
  readValues(){
    
  }

}
