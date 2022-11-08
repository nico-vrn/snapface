import { Observable,map, switchMap } from 'rxjs';
import {Injectable} from '@angular/core'
import { FaceSnap } from '../models/face-snap.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FaceSnapService{

  constructor(private http: HttpClient){}

  faceSnaps!: FaceSnap[];

  getAllFaceSnaps() : Observable<FaceSnap[]>{
    return this.http.get<FaceSnap[]>('http://localhost:3000/faceSnaps');
  }

  getFaceSnapById(id: number) : Observable<FaceSnap>{
    return this.http.get<FaceSnap>(`http://localhost:3000/faceSnaps/${id}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
        map(faceSnap => ({
            ...faceSnap,
            snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
            `http://localhost:3000/facesnaps/${faceSnapId}`,
            updatedFaceSnap)
        )
    );
}

  addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location: string}) : void{
    const newFaceSnap :FaceSnap = {
      ...formValue,
      id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
      createdDate: new Date(),
      snaps: 0
    };
    this.faceSnaps.push(newFaceSnap);
  }

}
