import { Test, TestingModule } from '@nestjs/testing';
import { SondageService } from './sondage.service';

describe('SondageService', () => {
  let service: SondageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SondageService],
    }).compile();

    service = module.get<SondageService>(SondageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
