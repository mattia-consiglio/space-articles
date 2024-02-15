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
					{isLoading && <Spinner animation="border" role="status" />}
					{isError && <Alert>Something went wrong...</Alert>}
					{!isError && !isLoading && (
						<article>
							<img
								src={article?.image_url}
								alt={article?.title}
								className="img-fluid"
							/>
							<h1>{article?.title}</h1>
							<p>
								<a
									href={article?.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									Source
								</a>
							</p>
							<p>{article?.summary}</p>
						</article>
					)}
				</Col>
			</Row>
		</Container>
	);
};
