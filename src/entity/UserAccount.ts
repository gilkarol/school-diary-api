import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import uuid from '../util/uuid';
import { Profile } from './Profile';

export interface UserAccountDto {
	email: string;
	password: string;
	profile?: Profile;
	profileRole: string;
	signupToken?: string;
}
@Entity()
export class UserAccount {
	@PrimaryColumn({ default: uuid })
	id?: string;

	@Column({ unique: true })
	email?: string;

	@Column({})
	password?: string;

	@OneToOne(() => Profile, (profile) => profile.userAccount)
	@JoinColumn()
	profile?: Profile;

	@Column({ default: null })
	profileRole?: string;
}
