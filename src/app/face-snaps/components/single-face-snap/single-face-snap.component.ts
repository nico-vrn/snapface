import { FaceSnap } from '../../../core/models/face-snap.model';
import { Component, OnInit } from '@angular/core';
import { FaceSnapService } from '../../../core/services/face-snap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(private faceSnapService: FaceSnapService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const id = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(id);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
        this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'snap').pipe(
            tap(() => this.buttonText = 'Oops, unSnap!')
        );
    } else {
        this.faceSnap$ = this.faceSnapService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
            tap(() => this.buttonText = 'Oh Snap!')
        );
    }
  }

}
