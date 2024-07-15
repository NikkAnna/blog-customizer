import { ArticleState, articleDefaultPageState } from '../app/App';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import cn from 'classnames';
import styles from './ArticleParamsForm.module.scss';
import { useClickOutside } from './hooks/useClickOutside';

export type ArticleFormState = {
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

type ArticleParamsFormProps = {
	changePageState: Dispatch<SetStateAction<ArticleState>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const isClicked = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useClickOutside(rootRef, setIsMenuOpen);

	const articleDefaultFormState: ArticleFormState = {
		fontFamily: { title: '', value: '', className: '' },
		fontSize: { title: '', value: '', className: '' },
		fontColor: { title: '', value: '', className: '' },
		backgroundColor: { title: '', value: '', className: '' },
		contentWidth: { title: '', value: '', className: '' },
	};

	const [formState, setFormState] = useState(articleDefaultFormState);

	const handlers = {
		onChangeFontFamily: (value: OptionType) => {
			setFormState({ ...formState, fontFamily: value });
		},
		onChangeFontSize: (value: OptionType) => {
			setFormState({ ...formState, fontSize: value });
		},
		onChangeFontColor: (value: OptionType) => {
			setFormState({ ...formState, fontColor: value });
		},
		onChangeBackgroundColor: (value: OptionType) => {
			setFormState({ ...formState, backgroundColor: value });
		},
		onChangeContentWidth: (value: OptionType) => {
			setFormState({ ...formState, contentWidth: value });
		},
	};

	const articleNewPageState: ArticleState = {
		fontFamily: formState.fontFamily.value,
		fontSize: formState.fontSize.value,
		fontColor: formState.fontColor.value,
		backgroundColor: formState.backgroundColor.value,
		contentWidth: formState.contentWidth.value,
	};

	const handleSubmit = (
		setPageState: Dispatch<SetStateAction<ArticleState>>
	) => {
		setPageState(articleNewPageState);
	};

	const handleReset = (
		setPageState: Dispatch<SetStateAction<ArticleState>>
	) => {
		setPageState(articleDefaultPageState);
		setFormState(articleDefaultFormState);
	};

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={isClicked} state={isMenuOpen} />
				<aside
					className={cn(
						styles.container,
						isMenuOpen ? styles.container_open : ''
					)}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(props.changePageState);
						}}
						onReset={(e) => {
							e.preventDefault();
							handleReset(props.changePageState);
						}}>
						<Text size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamily}
							title='Шрифт'
							onChange={handlers.onChangeFontFamily}
							placeholder='Выберите шрифт'
						/>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							title='Цвет шрифта'
							onChange={handlers.onChangeFontColor}
							placeholder='Выберите цвет шрифта'
						/>
						<RadioGroup
							name='Размер шрифта'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSize}
							onChange={handlers.onChangeFontSize}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							title='Цвет фона'
							onChange={handlers.onChangeBackgroundColor}
							placeholder='Выберите цвет фона'
						/>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							title='Ширина контента'
							onChange={handlers.onChangeContentWidth}
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
