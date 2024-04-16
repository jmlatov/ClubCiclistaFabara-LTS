import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {
  async getPhotos(cameraId: string, roverName: string) {
    try {
      const result = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?api_key=zYs29fSKMNLe1AgW5KmDGri5eu1vet8pzcONYcbf&sol=0&camera=${cameraId}`
      );
      const data = await result.json();
      console.log(data);
      return data;
    } catch (error) {
      alert('Error fetching photos:' + error);
    }
  }
}
