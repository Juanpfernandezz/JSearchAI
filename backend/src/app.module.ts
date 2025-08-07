import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfModule } from './pdf/pdf.module';
import { AuthModule } from './auth/auth.module';

console.log('Mongo URI:', process.env.MONGO_URI);

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),  // Lee las variables de entorno (.env)
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    PdfModule,  // Importa el módulo de PDFs
  ],
})
export class AppModule {}