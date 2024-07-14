import './styles/index.scss';

import { CSSProperties, StrictMode, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';
import clsx from 'clsx';
import { createRoot } from 'react-dom/client';

import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const articleFormState = {
		fontFamily: { title: '', value: '', className: '' },
		fontSize: { title: '', value: '', className: '' },
		fontColor: { title: '', value: '', className: '' },
		backgroundColor: { title: '', value: '', className: '' },
		contentWidth: { title: '', value: '', className: '' },
	};

	const [formState, setFormState] = useState(articleFormState);

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

	const articleState = {
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.contentWidth.value,
		contentWidth: defaultArticleState.backgroundColor.value,
	};

	const [pageState, setPageState] = useState(articleState);

	const handleSubmit = () => {
		setPageState({
			fontFamily: formState.fontFamily.value,
			fontSize: formState.fontSize.value,
			fontColor: formState.fontColor.value,
			backgroundColor: formState.backgroundColor.value,
			contentWidth: formState.contentWidth.value,
		});
	};

	const handleReset = () => {
		setPageState(articleState);
		setFormState(articleFormState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamily,
					'--font-size': pageState.fontSize,
					'--font-color': pageState.fontColor,
					'--container-width': pageState.contentWidth,
					'--bg-color': pageState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				states={formState}
				handlers={handlers}
				submit={handleSubmit}
				reset={handleReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
