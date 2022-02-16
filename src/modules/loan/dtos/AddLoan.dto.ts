import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LedgerType } from '../../../common/constants/common.enum';

export class AddLoan {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    @ApiProperty()
    person_of_interest: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    @ApiProperty()
    loan_amount: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    @ApiProperty()
    @IsIn(['CREDIT', 'DEBIT'])
    ledger_type: LedgerType;
}
