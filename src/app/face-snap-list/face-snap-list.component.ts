import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject, Observable } from 'rxjs';
import { concatMap, mergeMap, delay, exhaustMap, map, switchMap, take, tap, takeUntil } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapService } from '../services/face-snap.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps!:FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;
  private destroy$!:Subject<boolean>;

  constructor(private faceSnapService:  FaceSnapService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    // this.faceSnaps = this.faceSnapService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();

    // interval(1000).pipe(
    //   takeUntil(this.destroy$),
    //   tap(console.log),
    // ).subscribe();
  }

  ngOnDestroy(): void {
    //détruire les observables
    // this.destroy$.next(true);
  }

}
