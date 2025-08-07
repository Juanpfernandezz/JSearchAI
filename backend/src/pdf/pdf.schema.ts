import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PdfDocument = Pdf & Document;


@Schema()
export class Pdf {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;

  @Prop({ type: [Number], default: [] })
  embedding: number[];

}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
