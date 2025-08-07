import { Injectable, OnModuleInit } from '@nestjs/common';
import { pipeline } from '@xenova/transformers';

@Injectable()
export class EmbeddingService implements OnModuleInit {
  private embedder: any;

  // Se ejecuta automáticamente cuando arranca el módulo
  async onModuleInit() {
    this.embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }

  // Función pública para generar embeddings de un texto
  async generateEmbedding(text: string): Promise<number[]> {
    const output = await this.embedder(text, {
      pooling: 'mean',       // Saca un vector promedio del texto completo
      normalize: true        // Normaliza el vector para que tenga norma 1
    });

    return Array.from(output.data); // Convertimos el resultado a array plano de números
  }
}
