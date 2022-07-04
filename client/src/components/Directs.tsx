import { Direct, Input } from 'components'
import { ReactComponent as ExitIcon } from '../assets/exit.svg'
import { ReactComponent as SearchIcon } from '../assets/search.svg'

export const Directs = () => {
	return (
		<div className=" w-full md:min-w-[446px] md:w-[446px] h-full bg-steel-gray flex flex-col ">
			<div className="p-3 directs-header relative">
				<div className="text-oslo-gray font-bold mb-2">Directs</div>
				<Input
					placeholder="Search"
					icon={<SearchIcon className="absolute top-1/2 translate-y-[-50%] left-4" />}
				/>
			</div>
			<div className="smart-overflow h-full flex flex-col gap-3 p-3">
				<Direct unseenNumber={1} />
				<Direct unseenNumber={5} />
				<Direct unseenNumber={0} />
				<Direct unseenNumber={120} />
				<Direct selected />
				<Direct />
				<Direct />
				<Direct />
				<Direct />
				<Direct />
				<Direct />
			</div>
			<div className="bg-deep-dark py-5 px-6 account-controls flex justify-between items-center relative">
				<div className="flex gap-3 items-center w-full">
					<img
						className=" pr-2 avatar"
						src="https://pngroyale.com/wp-content/uploads/2021/12/Download-adorable-cat-PNG.png"
					/>
					<span className="text-white font-bold">Jesse_Pinkman</span>
				</div>
				<ExitIcon />
			</div>
		</div>
	)
}
