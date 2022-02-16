import { CustomBaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/User.entity';
import { LedgerType } from '../../../common/constants/common.enum'

@Entity()
export class Loan extends CustomBaseEntity {
    @ManyToOne(() => User, user => user.loans, { cascade: ['insert', 'update'] })
    user: User;

    @Column('varchar', { length: 150, name: 'name' })
    loan_amount: string;

    @Column('varchar', { length: 150, name: 'ledger_type' })
    ledger_type: LedgerType;

    @Column('varchar', { length: 150, name: 'person_of_interest' })
    person_of_interest: string;

    @Column('boolean', {
    default: () => 'false',
    name: 'payback_completed',
    })
    payback_completed: boolean;

}