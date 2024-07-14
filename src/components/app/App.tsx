import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from './index.module.scss';

export type ArticleState = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

export const articleDefaultPageState: ArticleState = {
	fontFamily: defaultArticleState.fontFamilyOption.value,
	fontSize: defaultArticleState.fontSizeOption.value,
	fontColor: defaultArticleState.fontColor.value,
	backgroundColor: defaultArticleState.contentWidth.value,
	contentWidth: defaultArticleState.backgroundColor.value,
};

export const App = () => {
	const [pageState, setPageState] = useState(articleDefaultPageState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamily,
					'--font-size': pageState.fontSize,
					'--font-color': pageState.fontColor,
					'--container-width': pageState.contentWidth,
					'--bg-color': pageState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm changePageState={setPageState} />
			<Article />
		</main>
	);
};
