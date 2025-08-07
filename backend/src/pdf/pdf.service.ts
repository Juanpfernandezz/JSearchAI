import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import pdfParse from 'pdf-parse';
import { Pdf, PdfDocument } from './pdf.schema';
import { EmbeddingService } from '../embedding/embedding.service';

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(Pdf.name) private pdfModel: Model<PdfDocument>,
    private readonly embeddingService: EmbeddingService,
  ) {}

  // Subida y procesamiento de PDF
  async handleUpload(file: Express.Multer.File) {
  try {
    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }

    const parsed = await pdfParse(file.buffer);
    const text = parsed.text || 'Texto vacío';

    const embedding = await this.embeddingService.generateEmbedding(text);

    const newPdf = new this.pdfModel({
      filename: file.originalname,
      text,
      embedding,
    });

    return await newPdf.save();
  } catch (error) {
    console.error('Error original en handleUpload:', error);
    // Para que te devuelva el error original y no solo 'Error procesando el PDF'
    throw error;
  }
}

  // Búsqueda semántica por similitud
  async searchSimilarPdfs(query: string) {
    // Generar embedding del texto de búsqueda
    const queryEmbedding = await this.embeddingService.generateEmbedding(query);

    // Obtener todos los PDFs
    const allPdfs = await this.pdfModel.find();

    // Calcular similitud coseno entre query y cada PDF
    const results = allPdfs.map(pdf => {
      const similarity = this.cosineSimilarity(queryEmbedding, pdf.embedding);
      return {
        _id: pdf._id,
        filename: pdf.filename,
        similarity,
      };
    });

    // Ordenar de mayor a menor similitud
    results.sort((a, b) => b.similarity - a.similarity);

    return results;
  }

  // 🔧 Utilidad interna para calcular similitud coseno
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Listar todos los PDFs
  async getAll() {
    return this.pdfModel.find();
  }
}
