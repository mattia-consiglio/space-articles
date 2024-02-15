import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article as IArticle } from "../interfaces/NewsList";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";

export const Article = () => {
	const { articleId } = useParams();
	const [article, setArticle] = useState<IArticle | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchArticle = useCallback(async () => {
		try {
			const response = await fetch(
				"https://api.spaceflightnewsapi.net/v4/articles/" + articleId,
			);
			if (!response.ok) throw new Error("Something went wrong...");
			const data: IArticle = await response.json();
			setArticle(data);
		} catch {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}, [articleId]);

	useEffect(() => {
		fetchArticle();
	}, [fetchArticle]);
	return (
		<Container className="mt-4">
			<Row>
				<Col>
					<div className="text-center">
						{isLoading && <Spinner animation="border" role="status" />}
						{isError && <Alert>Something went wrong...</Alert>}
					</div>
					{!isError && !isLoading && (
						<article>
							<div className="text-center">
								<img
									src={article?.image_url}
									alt={article?.title}
									className="img-fluid"
								/>
							</div>
							<h1 className="text-center">{article?.title}</h1>
							<p className="text-center">
								<a
									href={article?.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									{article?.news_site}
								</a>{" "}
								&#183;{" "}
								{article ? new Date(article.published_at).toDateString() : ""}
							</p>
							<p>{article?.summary}</p>
						</article>
					)}
				</Col>
			</Row>
		</Container>
	);
};
