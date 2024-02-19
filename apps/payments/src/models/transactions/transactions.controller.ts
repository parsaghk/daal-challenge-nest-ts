import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionRequestDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller()
export class TransactionsController {
  public constructor(
    private readonly _transactionsService: TransactionsService,
  ) {}

  @Post('money')
  createTransaction(
    @Body() createTransactionRequestDto: CreateTransactionRequestDto,
  ) {
    return this._transactionsService.createTransaction(
      createTransactionRequestDto,
    );
  }
}
