import arrow from 'src/images/arrow.svg';
import cn from 'classnames';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick: () => void;
	state: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={cn(styles.container, props.state ? styles.container_open : '')}
			onClick={props.onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={cn(styles.arrow, props.state ? styles.arrow_open : '')}
			/>
		</div>
	);
};
