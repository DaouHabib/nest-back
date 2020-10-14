import { Test, TestingModule } from '@nestjs/testing';
import { SondageController } from './sondage.controller';

describe('SondageController', () => {
  let controller: SondageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SondageController],
    }).compile();

    controller = module.get<SondageController>(SondageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
