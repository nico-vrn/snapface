import { Router } from '@angular/router';
import { FaceSnapService } from '../core/services/face-snap.service';
import { map } from 'rxjs/operators';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FaceSnap } from '../core/models/face-snap.model';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm! : FormGroup;
  faceSnapPreview$! : Observable<FaceSnap>;
  urlRegex! : RegExp;

  constructor(private formBuilder: FormBuilder,
    private FaceSnapService: FaceSnapService,
    private router : Router ) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
    }, { updateOn: 'blur' }
    );
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate : new Date(),
        id: Math.random().toString(36).substring(7),
        snaps: 0
      }))
    );

  }

  onSubmitForm() : void {
    this.FaceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe();
  }

}
