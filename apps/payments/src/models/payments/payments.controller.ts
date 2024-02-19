import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentRequestDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  public constructor(private readonly _paymentsService: PaymentsService) {}

  @Post('money')
  createPayment(@Body() createPaymentRequestDto: CreatePaymentRequestDto) {
    return this._paymentsService.createPayment(createPaymentRequestDto);
  }
}
