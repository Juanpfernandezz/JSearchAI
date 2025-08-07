import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  // Subida de PDF (requiere login)
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el form-data
  async uploadPdf(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user; // si más adelante querés asociar el PDF al usuario
    return this.pdfService.handleUpload(file);
  }

  // Búsqueda semántica (requiere login)
  @UseGuards(JwtAuthGuard)
  @Post('search')
  async searchPdf(@Body('query') query: string, @Req() req: Request) {
    const user = req.user;
    return this.pdfService.searchSimilarPdfs(query);
  }

  // Obtener todos los PDFs (pública o privada, como prefieras)
  @Get()
  async getAllPdfs() {
    return this.pdfService.getAll();
  }
}
