import { useEffect, useState } from 'react'
import sleep from 'utils/sleep'

const useLoading = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			await sleep(2000)
			setLoading(false)
		})()
	}, [])

	return [loading, setLoading]
}

export default useLoading
