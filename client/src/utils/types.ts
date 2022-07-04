/* eslint-disable @typescript-eslint/ban-types */
import { FunctionComponent, ReactNode } from 'react'

export type WrapperFunctionComponent<P = {}, C = ReactNode | string> = FunctionComponent<
	P & { children: C }
>
export type WFC<P = {}> = WrapperFunctionComponent<P>

export type UserStatus = 'online' | 'idle' | 'busy' | 'invisible'
