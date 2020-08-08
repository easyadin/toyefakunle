export class Media {
   // contains the properties of both video and audio
   constructor(
      public id: string,
      public alias: string, // a tag to easily find all audio in case downloaded to phone
      public mediaName: string,
      public mediaAuthor: 'Toye Fakunle',
      public mediaType: string, // video | audio | devotional
      public streamUrl: string,
      public downloadUrl: string,
      public albumName: string, // if any 
      public userTestimony: string, // the user in context not all testimonies
      public isLiked: string,
      public isDownloaded: string,
      public published: boolean
   ) { }
}

// devotional & Quotes
// ask pastor for what to display as regards devotional and quotes
export class Devotional {
   constructor(
      public id: string,
      public mediaType: string,
      public title: string,
      public scripture: string,
      public content: string,
      public createdAt: string,
      public published: boolean
   ) { }
}

