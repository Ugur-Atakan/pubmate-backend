import { v4 as uuidv4 } from 'uuid';
import { bucket } from 'src/config/firebase/firebase.config';

export class UploadService {
  async uploadFile(file: any): Promise<string> {
    const uniqueFilename = uuidv4() + '_' + file.originalname;
    const fileUpload = bucket.file(uniqueFilename);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    await new Promise<void>((resolve, reject) => {
      stream.on('finish', () => {
        resolve();
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.end(file.buffer);
    });

    const fileReference = bucket.file(`${fileUpload.name}`); // create reference to file.
    await fileReference.makePublic(); // make a public file.
    const url = fileUpload.publicUrl(); // // Get a public URL for the file.

    return url;
  }
}
