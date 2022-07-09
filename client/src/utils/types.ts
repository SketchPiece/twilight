/* eslint-disable @typescript-eslint/ban-types */
import { FunctionComponent, ReactNode } from 'react'

export type WrapperFunctionComponent<
	P = {},
	C = ReactNode | ReactNode[] | string
> = FunctionComponent<P & { children: C }>
export type WFC<P = {}> = WrapperFunctionComponent<P>

export enum UserStatus {
	ONLINE = 'online',
	IDLE = 'idle',
	BUSY = 'busy',
	INVISIBLE = 'invisible',
}
