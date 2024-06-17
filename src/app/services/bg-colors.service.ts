import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BgColorsService {
  public bgColors: string[] = ['#FF7A00', '#462F8A', '#FFBB2B', '#FC71FF', '#6E52FF', '#1FD7C1', '#9327FF', '#FF4646'];
  constructor() { }
}
