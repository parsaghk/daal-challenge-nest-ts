import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions';

@Module({
  imports: [TransactionsModule],
})
export class ModelsModule {}
