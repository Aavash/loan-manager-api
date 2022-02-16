import { Post,Get, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AddLoan } from './dtos/AddLoan.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/jwt/JwtGuard';
import { GetUser } from '../../common/GetUser'
import { LoanService } from './loan.service';

@ApiTags('Loan APIs')
@Controller('loan')
@UseGuards(JwtAuthGuard)
export class LoanController {

    constructor(
      private loanService: LoanService
    ) {}

    @Post('/add_loan/')
    async createLoan(
      @Body(ValidationPipe) dto: AddLoan,
      @GetUser() user
      ) {
      const loan = this.loanService.addLoan(user, dto)
      return loan
    }
  
    @Get('/get_loans/')
    async getMyLoans(
      @GetUser() user
      ) {
      const loan = this.loanService.getLoans(user)
      return loan
    }

}
