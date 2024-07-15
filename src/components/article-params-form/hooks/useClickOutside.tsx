import { useEffect } from 'react';

export const useClickOutside = (
	ref: React.RefObject<HTMLDivElement>,
	onChange: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const handleClick = (e: MouseEvent) => {
		if (
			ref.current &&
			e.target instanceof Node &&
			!ref.current.contains(e.target)
		) {
			onChange(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
};
