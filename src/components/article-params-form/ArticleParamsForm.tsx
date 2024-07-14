import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';
import { useRef, useState } from 'react';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import cn from 'classnames';
import styles from './ArticleParamsForm.module.scss';
import { useClickOutside } from './hooks/useClickOutside';

type ArticleParamsFormProps = {
	states: {
		fontFamily: {
			title: string;
			value: string;
			className: string;
		};
		fontSize: {
			title: string;
			value: string;
			className: string;
		};
		fontColor: {
			title: string;
			value: string;
			className: string;
		};
		backgroundColor: {
			title: string;
			value: string;
			className: string;
		};
		contentWidth: {
			title: string;
			value: string;
			className: string;
		};
	};
	handlers: {
		onChangeFontFamily: (value: OptionType) => void;
		onChangeFontSize: (value: OptionType) => void;
		onChangeFontColor: (value: OptionType) => void;
		onChangeBackgroundColor: (value: OptionType) => void;
		onChangeContentWidth: (value: OptionType) => void;
	};
	submit: () => void;
	reset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const isClicked = () => {
		setIsOpen(!isOpen);
	};

	useClickOutside(rootRef, setIsOpen);

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={isClicked} state={isOpen} />
				<aside
					className={cn(styles.container, isOpen ? styles.container_open : '')}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							props.submit();
						}}
						onReset={(e) => {
							e.preventDefault();
							props.reset();
						}}>
						<Text size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={props.states.fontFamily}
							title='Шрифт'
							onChange={props.handlers.onChangeFontFamily}
							placeholder='Выберите шрифт'
						/>
						<Select
							options={fontColors}
							selected={props.states.fontColor}
							title='Цвет шрифта'
							onChange={props.handlers.onChangeFontColor}
							placeholder='Выберите цвет шрифта'
						/>
						<RadioGroup
							name='Размер шрифта'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={props.states.fontSize}
							onChange={props.handlers.onChangeFontSize}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={props.states.backgroundColor}
							title='Цвет фона'
							onChange={props.handlers.onChangeBackgroundColor}
							placeholder='Выберите цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={props.states.contentWidth}
							title='Ширина контента'
							onChange={props.handlers.onChangeContentWidth}
							placeholder='Выберите ширину контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
