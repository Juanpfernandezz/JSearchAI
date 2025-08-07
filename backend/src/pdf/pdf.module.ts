import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { Pdf, PdfSchema } from './pdf.schema';
import { EmbeddingModule } from '../embedding/embedding.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pdf.name, schema: PdfSchema }]),
    EmbeddingModule,  // Importa EmbeddingModule para usar EmbeddingService
  ],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
