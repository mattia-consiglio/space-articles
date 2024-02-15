import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { NewsList, Article } from "../interfaces/NewsList";
import { CardNews } from "./CardNews";

export const Home = () => {
	const [newsList, setNewsList] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchNews = async () => {
		try {
			const response = await fetch(
				"https://api.spaceflightnewsapi.net/v4/articles/",
			);
			const data: NewsList = await response.json();
			setNewsList(data.results);
		} catch {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchNews();
	}, []);

	return (
		<Container className="mt-4">
			<Row>
				<Col>
					<h1 className="text-center">Spaceflight News</h1>
				</Col>
			</Row>
			{(isLoading || isError) && (
				<Row>
					<Col>
						{isLoading && <Spinner animation="border" role="status" />}
						{isError && <Alert>Something went wrong...</Alert>}
					</Col>
				</Row>
			)}

			<Row className="mt-4 g-4">
				{!isError &&
					!isLoading &&
					newsList.map((news) => <CardNews key={news.id} news={news} />)}
			</Row>
		</Container>
	);
};
