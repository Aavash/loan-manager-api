import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLoan } from './dtos/AddLoan.dto';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(Loan)
        private readonly loanRepository: Repository<Loan>
      ) {}

    
    async addLoan(user, loan_add: AddLoan){
        const loan = await this.loanRepository.save({
            ...loan_add,
            user: user
        })
        return loan
    }

    async getLoans(user){
        console.log(user)
        const loans = await this.loanRepository.find({
            where: {user: user}
        })
        return loans
    }
    

}
