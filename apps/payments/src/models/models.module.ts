import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments';

@Module({
  imports: [PaymentsModule],
})
export class ModelsModule {}
