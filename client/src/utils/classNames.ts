type classNamesArg = string | boolean | null | undefined

export const classNames = (...args: classNamesArg[]) =>
	args.filter(arg => typeof arg !== 'boolean' || !arg).join(' ')
