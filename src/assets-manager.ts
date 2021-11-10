export default class AssetsManager {
  public async loadText(resource: string): Promise < string > {
    return fetch(resource)
      .then(function(response: Response) {
        return response.text();
      })
  }
  public async loadJson(resource: string): Promise < any > {
    return fetch(resource)
      .then(function(response: Response) {
        return response.json();
      })
  }
  public async loadImage(resource: string): Promise < HTMLImageElement > {
    return new Promise(function(resolve, reject) {
      var image: HTMLImageElement = new Image();
      image.onload = function() {
        resolve(image);
      }
      image.onerror = reject;
      image.src = resource;
    })
  }
  public async loadFont(fontName: string, resource: string): Promise < FontFace > {
    return new FontFace(fontName, resource)
      .load();
  }
  public async loadBinary(resource: string): Promise < Blob > {
    return fetch(resource)
      .then(function(response: Response) {
        return response.blob();
      })
  }
}